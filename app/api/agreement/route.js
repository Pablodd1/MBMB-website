import { NextResponse } from "next/server";
import { sendEmailNotification } from "@/app/utils/email";
import connect from "@/app/utils/connect";
import { encryptData } from "@/app/utils/encrypt";
const unprotectedFields = ['Full Name', 'Agreement Date', 'Company Name'];

export async function POST(req) {
  const client = await connect();
  const agreement = await req.json();
  const encryptedAgreement = {}
  for (const [field, value] of Object.entries(agreement)) {
    if (unprotectedFields.includes(field)) {
      encryptedAgreement[field] = value;
    } else {
      encryptedAgreement[field] = encryptData(value);
    }
  }
  const html = createHTML(agreement);
  const subject = `New Agreement Form Submitted.`;
  const encryptedObj = {
    ...encryptedAgreement,
    createdAt: new Date(),
  }
  try {
    const col = client.db(process.env.MBMB).collection(process.env.AGREEMENTS);
    const result = await col.insertOne(encryptedObj);

    if (result.acknowledged) {
      await sendEmailNotification(subject, html);
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    } else {
      return NextResponse.error({ message: 'Failed to Save in Database' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}


function createHTML(data) {
  const agreement = {}
  for (const field in data) {
    agreement[field] = unprotectedFields.includes(field) ? data[field] : '*******';
  }
  let html = `
  <style>
body {
font-family:serif;
}
span,.client {
font-family:sans;
color:"#2f3d95";
font-weight:bold;
padding:2px;
background-color:#90EE90
}
section {
padding-top:15px;
padding-bottom:15px;  
}

.client {
padding:2px;
}
.bottom {
display: grid;
grid-template-columns: repeat(2, 1fr); /* Two columns */
gap: 1rem; /* Gap between grid items */

/* Flex direction row on small screens */
@media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
}
ul {
min-width: 380px; 
display: flex;
flex-direction: column;
list-decoration-style:none;
}

  </style>
  

  <section  >
  <article  >
      <p class='font-serif'  >
          THIS AGREEMENT FOR Medical Billing Services ("Agreement") is made today, <span > ${agreement["Agreement Date"]} </span>
          (the "Effective Date"), between Miami Beach Medical Billing LLC and  <span > ${agreement["Full Name"]}</span> (“Client”).
          <br /><br />WHEREAS, Miami Beach Medical Billing is a medical billing services company which provides computerized claims, billing and collection services to healthcare providers; and
          <br /><br />WHEREAS, Client wishes to retain Miami Beach Medical Billing to provide for medical billing services (“Services”) pursuant to the terms and conditions of this Agreement.
          <br /><br />NOW, THEREFORE, in consideration of the foregoing promises and mutual covenants set forth herein, the parties agree as follows
          <br /><br />1. <strong>MEDICAL BILLING SERVICES.</strong>
          <br /><br />Client hereby expressly authorizes Miami Beach Medical Billing to prepare, process and submit claims to commercial and government payors. Miami Beach Medical Billing will apply its best efforts to obtain reimbursement for Client’s charges for all clinical procedures and medical services provided to patients. All such claims shall be submitted by Miami Beach Medical Billing in the Client’s name and utilize provider numbers assigned to the Client by the respective third-party payor. Claims will be submitted either electronically or by means of paper submission as directed by the third-party payor. Payment of all claims filed on behalf of Client shall be directed to such accounts to which Client has control as may be required by third party payors. EchoScribe shall post payments received from the third-party payors to the patient's file and may bill the patient directly when necessary in order to secure full payment for the Client.
          <br /><br />2. <strong>CLIENT RESPONSIBILITIES</strong>
          <br /><br />2.1. Reasonable Assistance. Client agrees to provide Miami Beach Medical Billing with all necessary records, information and assistance to enable Miami Beach Medical Billing to provide such Services. Client shall be responsible for ensuring the accuracy and completeness of coding associated with claims and for ensuring the medical necessity and appropriateness of the Services for which a bill will be submitted. The client also agrees to promptly provide Miami Beach Medical Billing all copies of all Explanation of Benefits forms received from third party payors as well as records of payments received directly from patients.
          <br /><br />2.2. Systems Access.  Client hereby grants to Miami Beach Medical Billing the right to access and use its practice management software to facilitate the submission of medical claims. All patient information and data provided by the Client to Miami Beach Medical Billing shall be kept confidential and shall only be disclosed to parties necessary to successfully process and submit claims on behalf of the Client.
          <br /><br />2.3. Client Acknowledgement. Client acknowledges and agrees to the following:
          <br /><br />2.3.1. The ultimate responsibility for all claims submitted is that of the Client. Client shall be responsible for maintaining all original source documents to enable it to verify and document the claims submitted to third party payors. EchoScribe shall have no liability or responsibility whatsoever regarding the accuracy or completeness of the coding or determinations regarding medical necessity.
          <br /><br />3. <strong>FEES</strong>
          <br /><br />3.1. Setup Costs. There is no charge for the initial set up of the medical billing services.
          <br /><br />3.2. Net Collections. Client shall pay Miami Beach Medical Billing for medical billing services based on its total dollar amount of <span > ${agreement["Monthly Net Collection ($)"]}</span>
           monthly net collections. Client agrees to pay Miami Beach Medical Billing a rate of <span > ${agreement["Monthly Billing Rate"]}</span>
           of monthly net collections. Past due A/R collection services will be charged at the same rate.
          <br /><br />3.3. Patient Statements. If client wants Miami Beach Medical Billing to print and mail patient statements on its behalf, then client agrees to reimburse Miami Beach Medical Billing $1.00 per mailed patient statement.
          <br /><br />3.4. Terms of Payment. Miami Beach Medical Billing shall invoice Client at the beginning of each month for the prior month’s Services by electronic or US mail.  The invoice will summarize the total amount due based on the net collections for the month being invoiced. Payments are due within thirty (30) days of receipt of invoice.
          <br /><br />Delinquent payment is subject to a late fee in the amount of $50.00 per delinquent month or 2% monthly interest, whichever is greater. Client agrees to pay Miami Beach Medical Billing via bank <span > ${agreement["Auto-Pay Amount"]}</span> auto-pay.
          <br /><br />3.5. Disputed Fees. Should Client dispute any portion of the invoice, Client must notify Miami Beach Medical Billing within twenty (20) days of the date of invoice by emailing Jasmel@medicalbillingmb.com. Failure to notify Miami Beach Medical Billing within this time-frame shall be deemed acceptance to pay Miami Beach Medical Billing in full for the invoice. Payment of invoice shall also be deemed as acceptance of charges.
          <br /><br />4. <strong>CONFIDENTIALITY AND HIPAA</strong>
          <br /><br />4.1. Business Associate Agreement. Miami Beach Medical Billing and Client will abide by the covenants and provisions of the “Business Associates Agreement,” which is incorporated herein by reference.
          <br /><br />5. <strong>TERM AND TERMINATION</strong>
          <br /><br />5.1. Term. This Agreement shall remain in effect until terminated by either party. This Agreement may be terminated if there is a breach in contract or for simple convenience. The terminating party is responsible to provide a forty-five (45) day written notice to the other party along with an explanation for termination.
          <br /><br />5.2. Rights on Termination. Upon termination, Client shall be permitted to terminate Miami Beach Medical Billing’s access to its systems. Client shall be required to pay all fees accrued as of the date of termination plus any claims or charges that are pending or in-transit.
          <br /><br />6. <strong>LIMITATIONS OF WARRANTY AND LIABILITY</strong>
          <br /><br />6.1. Limited Warranty.  Other than the foregoing limited warranty, all Services are provided "as is," without any warranty whatsoever, whether express or implied, including but not limited to the warranties of merchantability and fitness for a particular purpose.
          <br /><br />6.2. Limitation of Liability.
          <br /><br />6.2.1. Client hereby agrees to indemnify and hold Miami Beach Medical Billing and its owners, directors, employees and contractors harmless from and against any and all liability, claims, causes of action, damages, fines, assessments, penalties, costs (including reasonable attorney fees) and responsibility of any kind arising from the performance or non-performance of this agreement or any acts or omissions associated. Client shall holdMiami Beach Medical Billing and its owners, directors, employees and contractors harmless from and against any claims submitted on behalf of and in the name of the Client for which client has provided Miami Beach Medical Billing false, fraudulent, incomplete, misleading, or otherwise incorrect information or data, including but not limited to the coding of claims pursuant to Section 2.1 above.
          <br /><br />6.2.2. To the maximum extent permitted by applicable law, in no event shall either party be liable for special, indirect, incidental, punitive or consequential damages, whether arising under contract, warranty, or tort (including negligence or strict liability) or any other theory of liability.
          <br /><br />6.2.3. The submission of false, fraudulent or misleading data, information, or statements to the government and/or commercial third party payors in connection with health insurance coding, billing and claims submission is a crime and can subject the violator to imprisonment and fines.
          <br /><br />6.2.4. Client expressly acknowledges and agrees that in no case shall Miami Beach Medical Billing’s liability for damages, regardless of the form of the action, exceed the amount of fees paid by client hereunder during the most recent three (3) month period immediately preceding the event giving rise to the claim. Notwithstanding anything to the contrary contained in this Agreement, neither party shall be liable to the other for any third-party claims even if a party has been apprised of the likelihood of such damages.
          <br /><br />6.2.5. The parties will not incur liability to each other for failing to perform any obligation under this Agreement if such failure results from a force majeure event or any force beyond their reasonable control.
          <br /><br />7. <strong>GENERAL</strong>
          <br /><br />7.1. Choice of Law and Jurisdiction. This agreement is governed by the laws of the State of Florida, without regard to their conflict of law provisions.
          <br /><br />7.2. Entire Agreement. This Agreement constitutes the entire agreement and understanding between the parties with respect to the subject matter of this Agreement and supersedes all prior agreements or understandings.
          <br /><br />7.3. Notices. All communications or notices permitted or required to be given or served under this Agreement shall be in writing via email or postal mailed to the addresses set forth on the first page of this Agreement.
          <br /><br />7.4. Counterparts. This Agreement may be executed in one or more counterparts, each of which shall constitute an original hereof, and all of which shall constitute one and the same document. Facsimile signatures on any such counterpart shall be binding as originals.
          <br /><br />IN WITNESS WHEREOF, the parties hereto have caused this Agreement to be executed by their respective duly authorized representative as of the Effective Date.

      </p>
  </article>
  <article class={"bottom"} >
  <ul class="client" >
      ['ClientSign']
      <li > ${agreement["Print Name"]} </li>
      <li > ${agreement["Title"]} </li>
      <li > ${agreement["Company Name"]}</li>

  </ul>
  <ul  >
      ['MBMBSign']
      <li > ["MBMB Print Name"] </li>
      <li > ["MBMB Title"] </li>
      <li > ["MBMB Company Name"] </li>
  </ul>
  </article >
</section>

  `;


  html += `<p style="margin-top: 25px;"><hr/> Date: ${new Date()}</p>`

  return html
}