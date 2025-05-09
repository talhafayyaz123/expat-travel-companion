import React from "react";

const UserAgreement = () => {
  return (
    <div className="container py-10   mt-[100px]">
      <div className="flex justify-center items-center">
        <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-5 w-max border-b pb-1">
          User Agreement
        </h1>
      </div>
      <p className="text-gray-700 mb-4">
        This Website and its associated services are open to all individuals who
        meet the eligibility criteria, regardless of gender. By registering for
        an account, you confirm that you meet these criteria and agree to
        respect the inclusive nature of the platform. We are committed to
        fostering a safe, supportive, and respectful environment for all users.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mt-2">
            By registering for, accessing, or using ExpatGlobalGroup.com, you
            acknowledge that you have read, understood, and agree to be bound by
            this User Agreement, our Privacy Policy, our Terms & Conditions, and
            Community Guidelines.
          </p>
        </div>

        {/* Section 2-11 */}
        <ul className=" space-y-6 text-gray-700">
          {/* Section 2 */}
          <li>
            <h3 className="text-xl font-semibold ">2. Eligibility</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>You must be at least 21 years old to join our platform.</li>
              <li>
                This Website and its associated services are open to all
                individuals who meet the eligibility criteria, regardless of
                gender. By registering for an account, you confirm that you meet
                these criteria and agree to respect the inclusive nature of the
                platform. We are committed to fostering a safe, supportive, and
                respectful environment for all users.
              </li>
              <li>
                By registering, you affirm that all information you provide,
                including identification documents and social media account
                links, are accurate and truthful.
              </li>
              <li>
                <span className="font-bold">B&B Global Ventures, LLC.</span>,
                the parent company, reserves the right to refuse service to any
                individual at its sole discretion.
              </li>
            </ul>
          </li>

          {/* Section 3 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              3. Account Responsibilities
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>
                <strong>Accuracy of Information:</strong> You agree to provide
                accurate and truthful information when creating your profile and
                interacting with other members.
              </li>
              <li>
                <strong>Account Security:</strong> You are responsible for
                maintaining the confidentiality of your login credentials.
                Notify us immediately if you suspect unauthorized use of your
                account.
              </li>
              <li>
                <strong>Prohibited Activities:</strong> You may not share your
                account, create multiple accounts, or impersonate others.
              </li>
            </ul>
          </li>

          {/* Section 4 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              4. Community Conduct
            </h3>
            <p>
              You agree to abide by our Community Guidelines, which promote a
              respectful, safe, and inclusive environment. Prohibited actions
              include but are not limited to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>Harassment, discrimination, or hate speech.</li>
              <li>Soliciting or spamming other members.</li>
              <li>Sharing explicit, inappropriate, or offensive content.</li>
            </ul>
          </li>

          {/* Section 5 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              5. Use of Services
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>
                <strong>Purpose of Platform:</strong> Our services are intended
                for connecting adults for travel, house-sharing, and
                community-building purposes.
              </li>
              <li>
                <strong>Messaging and Video Features:</strong> Use the internal
                messaging and third-party video call tools responsibly. Do not
                use these features for unsolicited promotion or inappropriate
                conduct.
              </li>
              <li>
                <strong>Posting Businesses:</strong> Members may share their
                businesses in designated areas but must refrain from direct
                solicitation through messages.
              </li>
            </ul>
          </li>

          {/* Section 6 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              6. Safety and Disclaimer
            </h3>
            <p>
              While we strive to provide a secure environment,
              ExpatGlobalGroup.com cannot guarantee the safety or reliability of
              every interaction. You acknowledge:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>
                You are responsible for exercising caution in all communications
                and meetings.
              </li>
              <li>
                ExpatGlobalGroup.com is not liable for the actions or conduct of
                its members.
              </li>
            </ul>
          </li>

          {/* Section 7 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              7. Content Ownership and Use
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>
                <strong>User-Generated Content:</strong> You retain ownership of
                the content you post but grant ExpatGlobalGroup.com a
                non-exclusive, royalty-free license to use it for operational
                purposes.
              </li>
              <li>
                <strong>Prohibited Content:</strong> You may not post content
                that infringes on intellectual property rights, violates laws,
                or breaches this agreement.
              </li>
            </ul>
          </li>

          {/* Section 8 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              8. Account Suspension or Termination
            </h3>
            <p className="mt-2">
              ExpatGlobalGroup.com reserves the right to suspend or terminate
              your account if you violate this agreement or engage in behavior
              that jeopardizes the community’s safety and integrity. Actions may
              include:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>Issuing warnings.</li>
              <li>Removing offending content.</li>
              <li>Permanently banning accounts for severe violations.</li>
            </ul>
          </li>

          {/* Section 9 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              9. Dispute Resolution
            </h3>
            <p>
              In the event of a dispute between you and ExpatGlobalGroup.com:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>
                Attempt to resolve issues informally by contacting our support
                team.
              </li>
              <li>
                Any unresolved disputes will be subject to arbitration under
                applicable laws.
              </li>
            </ul>
          </li>

          {/* Section 10 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              10. Modifications to the Agreement
            </h3>
            <p className="mt-2">
              ExpatGlobalGroup.com reserves the right to update or modify this
              User Agreement at any time. Members will be notified of
              significant changes, and continued use of the platform constitutes
              acceptance of the revised terms.
            </p>
          </li>

          {/* Section 11 */}
          <li>
            <h3 className="text-xl font-semibold text-gray-800">
              11. Limitation of Liability
            </h3>
            <p className="mt-2">
              ExpatGlobalGroup.com is not liable for any indirect, incidental,
              or consequential damages arising from your use of the platform.
              This includes but is not limited to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 pl-6">
              <li>Interactions with other members.</li>
              <li>Issues related to house-sharing or travel arrangements.</li>
            </ul>
          </li>
        </ul>

        {/* Section 12 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            12. Governing Law
          </h2>
          <p className="text-gray-700 mt-2">
            This agreement is governed by the laws of Texas, USA. Any legal
            disputes will be resolved in courts located in Texas, USA.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-700 mt-2">
            For questions or concerns about this agreement, please contact us at
            info@ExpatGlobalGroup.com.
          </p>
        </div>
      </div>

      <p className="mt-4">
        By creating an account on ExpatGlobalGroup.com, you agree to this User
        Agreement. Thank you for being a part of our community and helping us
        build a safe, empowering space for solo travelers!
      </p>

      <p className="text-gray-500 text-sm mt-8">Last updated: 5 January 2025</p>
    </div>
  );
};

export default UserAgreement;
