const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID;

export async function submitToHubSpot({ fullName, phone, email, message }) {
     if (!PORTAL_ID || !FORM_GUID) {
          console.warn(
               'HubSpot integration skipped — VITE_HUBSPOT_PORTAL_ID or VITE_HUBSPOT_FORM_GUID not set.'
          );
          return;
     }

     // Split fullName into first/last for HubSpot's default properties
     const nameParts = fullName.trim().split(/\s+/);
     const firstName = nameParts[0] || '';
     const lastName = nameParts.slice(1).join(' ') || '';

     const payload = {
          fields: [
               { name: 'firstname', value: firstName },
               { name: 'lastname', value: lastName },
               { name: 'email', value: email },
               { name: 'phone', value: phone },
               { name: 'message', value: message }
          ],
          context: {
               pageUri: window.location.href,
               pageName: document.title,
          },
     };

     // Capture the HubSpot tracking cookie if the HubSpot script is loaded
     const hutk = document.cookie
          .split('; ')
          .find((row) => row.startsWith('hubspotutk='));
     if (hutk) {
          payload.context.hutk = hutk.split('=')[1];
     }

     const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

     const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
     });

     if (!response.ok) {
          const errorText = await response.text();
          console.warn('HubSpot submission failed:', response.status, errorText);
     } else {
          console.log('HubSpot contact created/updated successfully.');
     }
}
