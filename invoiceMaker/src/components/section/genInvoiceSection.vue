<template>
  <main class="w-full min-h-screen bg-gray-50 p-8 flex justify-center items-start gap-8">

    <div class="w-full max-w-lg flex flex-col justify-items-start items-start gap-4">

      <h2 class="text-3xl font-extrabold">Create New Invoice</h2>
      
      <p class="font-semibold text-gray-700">Fill in invoice details</p>

      <p class="text-xs font-light text-gray-500 bg-gray-100 p-2 rounded-md">
        <i class="ri-error-warning-line"></i>
        You can save unfinished invoice as draft and complete later.
      </p>

      <Accordion
        title="Détails de mon entreprise"
        :fields="myDetailsFields"
        v-model="myDetailsData"
      />

      <Accordion
        title="Détails du clients"
        :fields="clientDetailsFields"
        v-model="clientDetailsData"
      />

      <Accordion
        title="Details de la facture"
        :fields="invoiceDetailsFields"
        v-model="invoiceDetailsData"
      />

      <accordionForm
        title="Articles de la facture"
        v-model="invoiceItems"
      />

      <Accordion
        title="Détails du paiement"
        :fields="paymentDetailsFields"
        v-model="paymentDetailsData"
      />

      <Accordion
        title="Notes supplementaires"
        :fields="notesFields"
        v-model="notesData"
      />

      <button class="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
        Save Invoice
      </button>

    </div>

    <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <div>
          <span class="text-lg font-semibold">Preview</span>
          <a href="#" class="ml-4 text-sm text-blue-600 hover:underline">PDF</a>
          <a href="#" class="ml-2 text-sm text-blue-600 hover:underline">Email</a>
          <a href="#" class="ml-2 text-sm text-blue-600 hover:underline">Online Payment</a>
        </div>
        <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          Save Invoice
        </button>
      </div>
      
      <invoicePreview
        :company-data="myDetailsData"
        :client-data="clientDetailsData"
        :invoice-data="invoiceDetailsData"
        :invoice-items="invoiceItems"
        :payment-data="paymentDetailsData"
        :notes-data="notesData"
      />
    </div>

  </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import Accordion from '../tools/Accordion.vue';
import invoicePreview from './invoicePreview.vue';
import accordionForm from '../tools/accordionForm.vue';

export default {
  name: 'InvoiceGenerator',
  components: {
    Accordion,
    invoicePreview,
    accordionForm
  },
  setup() {
    
    // Données réactives pour chaque section de l'accordéon
    const myDetailsData = ref({});
    const clientDetailsData = ref({});
    const invoiceDetailsData = ref({});
    const paymentDetailsData = ref({});
    const notesData = ref({});
    const invoiceItems = ref([]);

    // --- Définition des champs pour chaque accordéon ---

    const myDetailsFields = [
      [
        { name: 'companyName', label: 'Your Name / Company Name', placeholder: 'Washim Chowdhury', span: 1 },
        { name: 'email', label: 'Your Email', placeholder: 'washim@gmail.com', type: 'email', span: 1 }
      ],
      [
        { name: 'address', label: 'Your Address', placeholder: 'Zindabazar, Sylhet, Bangladesh', span: 2 }
      ],
      [
        { name: 'phone', label: 'Your Phone', placeholder: '+88 01729 214 992', type: 'tel', span: 1 },
        { name: 'website', label: 'Your Website', placeholder: 'washim.com', type: 'text', span: 1 }
      ],
      [
        { name: 'abn', label: 'ABN / Tax ID', placeholder: 'ABN 12345', span: 1 }
      ]
    ];

    const clientDetailsFields = [
      [
        { name: 'clientName', label: 'Client\'s Name', placeholder: 'Tony Stark', span: 1 },
        { name: 'clientEmail', label: 'Client\'s Email', placeholder: 'tony@gmail.com', type: 'email', span: 1 }
      ],
      [
        { name: 'clientAddress', label: 'Client\'s Address', placeholder: 'Mirabazar, Sylhet, Bangladesh', span: 2 }
      ],
      [
        { name: 'clientPhone', label: 'Client\'s Phone', placeholder: '(208) 234-22455', type: 'tel', span: 1 },
        { name: 'clientWebsite', label: 'Client\'s Website', placeholder: 'tonystark.com', type: 'text', span: 1 }
      ]
    ];

    const invoiceDetailsFields = [
      [
        { name: 'project', label: 'Project Name', placeholder: 'Fillo Product Design', span: 2 }
      ],
      [
        { name: 'issuedDate', label: 'Issued Date', placeholder: 'Feb 15, 2025', type: 'date', span: 1 },
        { name: 'dueDate', label: 'Due Date', placeholder: 'Feb 20, 2025', type: 'date', span: 1 }
      ]
    ];

    const paymentDetailsFields = [
      [
        { name: 'method', label: 'Payment Method', placeholder: 'BFT Bank Transfer', span: 1 },
        { name: 'accountName', label: 'Account Name', placeholder: 'Washim Chowdhury', span: 1 }
      ],
      [
        { name: 'accountNumber', label: 'Account Number', placeholder: '991198345445123', span: 1 },
        { name: 'code', label: 'Code (e.g., Swift)', placeholder: '123456', span: 1 }
      ]
    ];
    
    const notesFields = [
      [
        { name: 'note', label: 'Note', placeholder: 'There will be a late payment fee...', type: 'text', span: 1 },
        { name: 'gstNote', label: 'GST Note', placeholder: 'Note: GST will be paid by me, Tony Stark.', type: 'text', span: 1 }
      ]
    ];

    return {
      myDetailsData,
      clientDetailsData,
      invoiceDetailsData,
      paymentDetailsData,
      notesData,
      myDetailsFields,
      clientDetailsFields,
      invoiceDetailsFields,
      paymentDetailsFields,
      notesFields,
      invoiceItems,
    };
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaires */
</style>