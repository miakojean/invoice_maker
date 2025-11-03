<template>
  <main class="w-full min-h-screen bg-gray-50 p-8 flex justify-center items-start gap-8">

    <div class="w-full max-w-lg flex flex-col justify-items-start items-start gap-4">

      <h2 class="text-3xl font-extrabold">Créer une nouvelle facture</h2>
      
      <p class="font-semibold text-gray-700">Remplissez les détails de la facture</p>

      <p class="text-xs font-light text-gray-500 bg-gray-100 p-2 rounded-md">
        <i class="ri-error-warning-line"></i>
        Vous pouvez enregistrer une facture inachevée comme brouillon et la compléter plus tard.
      </p>

      <Accordion
        title="Détails de mon entreprise"
        :fields="myDetailsFields"
        v-model="myDetailsData"
      />

      <Accordion
        title="Détails du client"
        :fields="clientDetailsFields"
        v-model="clientDetailsData"
      />

      <Accordion
        title="Détails de la facture"
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
        title="Notes supplémentaires"
        :fields="notesFields"
        v-model="notesData"
      />

      <mainButton 
        label="Enregistrer la facture"
        @click="simulationApi"
        :isLoading="isLoading"
      />

    </div>

    <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <div>
          <span class="text-lg font-semibold">Aperçu</span>
          <a href="#" class="ml-4 text-sm text-blue-600 hover:underline">PDF</a>
          <a href="#" class="ml-2 text-sm text-blue-600 hover:underline">Email</a>
          <a href="#" class="ml-2 text-sm text-blue-600 hover:underline">Paiement en ligne</a>
        </div>
        <mainButton 
          label="Enregistrer la facture" 
          @click="simulationApi"
          :isLoading="isLoading"
        />
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
import mainButton from '../button/mainButton.vue'

export default {
  name: 'GenerateurFacture',
  components: {
    Accordion,
    invoicePreview,
    accordionForm,
    mainButton
  },
  setup() {
    
    // Données réactives pour chaque section de l'accordéon
    const myDetailsData = ref({});
    const clientDetailsData = ref({});
    const invoiceDetailsData = ref({});
    const paymentDetailsData = ref({});
    const notesData = ref({});
    const invoiceItems = ref([]);
    const isLoading = ref(false);

    // --- Définition des champs pour chaque accordéon ---

    const myDetailsFields = [
      [
        { name: 'companyName', label: 'Votre nom / Nom de l’entreprise', placeholder: 'Washim Chowdhury', span: 1 },
        { name: 'email', label: 'Votre email', placeholder: 'washim@gmail.com', type: 'email', span: 1 }
      ],
      [
        { name: 'address', label: 'Votre adresse', placeholder: 'Zindabazar, Sylhet, Bangladesh', span: 2 }
      ],
      [
        { name: 'phone', label: 'Votre téléphone', placeholder: '+88 01729 214 992', type: 'tel', span: 1 },
        { name: 'website', label: 'Votre site web', placeholder: 'washim.com', type: 'text', span: 1 }
      ],
      [
        { name: 'abn', label: 'Numéro fiscal / ABN', placeholder: 'ABN 12345', span: 1 }
      ]
    ];

    const clientDetailsFields = [
      [
        { name: 'clientName', label: 'Nom du client', placeholder: 'Tony Stark', span: 1 },
        { name: 'clientEmail', label: 'Email du client', placeholder: 'tony@gmail.com', type: 'email', span: 1 }
      ],
      [
        { name: 'clientAddress', label: 'Adresse du client', placeholder: 'Mirabazar, Sylhet, Bangladesh', span: 2 }
      ],
      [
        { name: 'clientPhone', label: 'Téléphone du client', placeholder: '(208) 234-22455', type: 'tel', span: 1 },
        { name: 'clientWebsite', label: 'Site web du client', placeholder: 'tonystark.com', type: 'text', span: 1 }
      ]
    ];

    const invoiceDetailsFields = [
      [
        { name: 'project', label: 'Nom du projet', placeholder: 'Fillo Product Design', span: 2 }
      ],
      [
        { name: 'issuedDate', label: 'Date d\'émission', placeholder: '15 février 2025', type: 'date', span: 1 },
        { name: 'dueDate', label: 'Date d\'échéance', placeholder: '20 février 2025', type: 'date', span: 1 }
      ]
    ];

    const paymentDetailsFields = [
      [
        { name: 'method', label: 'Méthode de paiement', placeholder: 'Virement bancaire BFT', span: 1 },
        { name: 'accountName', label: 'Nom du compte', placeholder: 'Washim Chowdhury', span: 1 }
      ],
      [
        { name: 'accountNumber', label: 'Numéro de compte', placeholder: '991198345445123', span: 1 },
        { name: 'code', label: 'Code (ex. Swift)', placeholder: '123456', span: 1 }
      ]
    ];
    
    const notesFields = [
      [
        { name: 'note', label: 'Note', placeholder: 'Des frais de retard seront appliqués...', type: 'text', span: 1 },
        { name: 'gstNote', label: 'Note TVA', placeholder: 'Note : La TVA sera payée par moi, Tony Stark.', type: 'text', span: 1 }
      ]
    ];

    const simulationApi = () => {
      isLoading.value = true;
      setTimeout(()=>{
        alert("Simulation résussie, vous pouvez ressayer");
        isLoading.value = false
      }, 2000)
    }

    return {
      isLoading,
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

      simulationApi,
    };
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaires */
</style>
