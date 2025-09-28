import { NextResponse } from "next/server";
import { sendEmailNotification } from "@UTILS/email";
import connect from "@UTILS/connect";
import { encryptData } from "@UTILS/encrypt";
const unprotectedFields = ['Date of Birth', 'Practice Name', 'Joining Date / Start Date of Group', 'CAQH Login', 'Office Manager/Primary Contact Person', 'PECOS Login'];

export async function POST(req) {
  const client = await connect();
  const formData = await req.json();
  const billing = {};
  for (const [category, fields] of Object.entries(formData)) {
    billing[category] = {};
    for (const [field, value] of Object.entries(fields)) {
      if (unprotectedFields.includes(field)) {
        billing[category][field] = value;
      } else {
        billing[category][field] = encryptData(value);
      }
    }
  }
  const encryptedObj = {
    ...billing,
    createdAt: new Date(),
  }
  const html = createHTML(formData);
  const subject = `New Billing Form.`;
  try {
    await sendEmailNotification(subject, html);
    const col = client.db(process.env.MBMB).collection(process.env.BILLING);
    const result = await col.insertOne(encryptedObj);

    if (result.acknowledged) {
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    } else {
      return NextResponse.error({ message: 'Failed to Save in Database' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}

function createHTML(formData) {

  let html = `
<style>
  section {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  h3 {
    margin: 0;
    padding: 5px 10px;
    background-color: #2f3d95;
    color: #fff;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top:25px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom:15px;
  }

  th, td {
      width:50%;
    padding: 10px;
    border: 1px solid #2f3d95;
    text-align: left;
  }

  th {
    background-color: #eee;
    font-weight: bold;
  }

  .no-data {
    text-align: center;
    padding: 15px;
    color: #aaa;
  }
</style>
`;

  for (const section in formData) {
    html += `
  <section>
    <h3>${section}</h3>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
`;

    const fields = formData[section];

    if (Object.keys(fields).length > 0) {
      for (const field in fields) {
        const value = fields[field];
        const displayValue = unprotectedFields.includes(field) ? value : '*******';
        html += `
        <tr>
          <td>${field}</td>
          <td>${displayValue}</td>
        </tr>
    `;
      }
    } else {
      html += `<p class="no-data">No data available.</p>`;
    }

    html += `
      </tbody>
    </table>
  </section>
  
`;
  }
  html += ` <p style="margin-top: 25px;"><hr/>Date: ${new Date()}</p>`

  return html
}