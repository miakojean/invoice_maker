<template>
  <main class="w-full min-h-screen bg-gray-50 p-8 flex justify-center items-center gap-2">
    <div class="w-full flex flex-col justify-items-start gap-4 ">

      <h2 class="text-3xl font-extrabold">Créer une nouvelle facture</h2>

      <p class="font-semibold">Complétez les champs pour générer votre facture</p>

      <p class="text-xs font-extralight">
        <i class="ri-error-warning-line"></i>
        Vous pouvez enregistrer une facture en tant que brouillon et la terminer après
      </p>

      <Accordion
            title="Mes informations personnelles"
            :fields="personalFields"
            v-model="personalData"
        />

        <!-- Informations de facturation -->
        <Accordion
            title="Informations de facturation"
            :fields="billingFields"
            v-model="billingData"
        />

        <!-- Informations de livraison -->
        <Accordion
            title="Informations de livraison"
            :fields="shippingFields"
            v-model="shippingData"
        />
    </div>
    <div class="w-full">
      <h2>Preview</h2>
    </div>
  </main>
</template>

<script>
import { ref, reactive } from 'vue';
import Accordion from '@/components/tools/accordion.vue';
import { useInvoiceStore } from '@/stores/invoicecartstore';

export default {
  name: 'InvoiceGenerator',
  components: {
    Accordion
  },
  setup() {
    const store = useInvoiceStore();

    // Données réactives
    const personalData = ref({});
    const billingData = ref({});
    const shippingData = ref({});

    // Configuration des champs pour les informations personnelles
    const personalFields = [
      [
        {
          name: 'companyName',
          label: 'Nom de mon entreprise',
          placeholder: 'Entrer le nom de l\'entreprise',
          type: 'text',
          span: 1
        },
        {
          name: 'email',
          label: 'Mon émail',
          placeholder: 'Entrer l\'email de l\'entreprise',
          type: 'email',
          span: 1
        }
      ],
      [
        {
          name: 'phone',
          label: 'Téléphone',
          placeholder: 'Entrer numéro de téléphone',
          type: 'tel',
          span: 1
        },
        {
          name: 'address',
          label: 'Adresse',
          placeholder: 'Entrer adresse',
          type: 'text',
          span: 1
        }
      ]
    ];

    // Configuration des champs pour la facturation
    const billingFields = [
      [
        {
          name: 'clientName',
          label: 'Nom du client',
          placeholder: 'Nom complet du client',
          type: 'text',
          span: 1
        },
        {
          name: 'clientEmail',
          label: 'Email du client',
          placeholder: 'email@client.com',
          type: 'email',
          span: 1
        }
      ],
      [
        {
          name: 'clientAddress',
          label: 'Adresse du client',
          placeholder: 'Adresse complète du client',
          type: 'text',
          span: 2
        }
      ]
    ];

    // Configuration des champs pour la livraison
    const shippingFields = [
      [
        {
          name: 'shippingAddress',
          label: 'Adresse de livraison',
          placeholder: 'Adresse de livraison',
          type: 'text',
          span: 1
        },
        {
          name: 'shippingDate',
          label: 'Date de livraison',
          placeholder: 'JJ/MM/AAAA',
          type: 'date',
          span: 1
        }
      ],
      [
        {
          name: 'shippingNotes',
          label: 'Notes de livraison',
          placeholder: 'Instructions spéciales...',
          type: 'text',
          span: 2
        }
      ]
    ];

    return {
      store,
      personalData,
      billingData,
      shippingData,
      personalFields,
      billingFields,
      shippingFields
    };
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaires */
</style>