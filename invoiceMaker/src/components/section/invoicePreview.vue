<template>
  <section class="h-full p-4 flex justify-center items-center bg-gray-100">
    <div class="preview-container bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl">
      <!-- En-tête de la facture -->
      <div class="invoice-header text-gray p-8">
        <div class="flex justify-between items-start">
          <div class="flex flex-col gap-1">
            <h2 class="text-xl font-bold mb-2">Facture</h2>
            <p class="text-gray-400 text-sm">N° <span class="font-mono bg-white/20 px-2 py-1 rounded">{{ invoiceNumber }}</span></p>
            <p class="text-sm text-gray-600 mt-2">{{ invoiceData.project || 'Projet non spécifié' }}</p>
          </div>
          <div class="text-right flex flex-col gap-1">
            <h2 class="text-xl font-semibold">{{ companyData.companyName || 'Votre entreprise' }}</h2>
            <p class="text-gray-400 text-sm">{{ companyData.email || 'email@entreprise.com' }}</p>
            <p class="text-gray-400 text-sm">{{ companyData.phone || 'Téléphone non renseigné' }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client et date -->
      <div class="p-8 border-b border-gray-200">
        <div class="grid grid-cols-2 gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-gray-500 mb-2">CLIENT</h3>
            <p class="text-lg font-semibold">{{ clientData.clientName || 'Nom du client' }}</p>
            <p class="text-gray-600 text-sm">{{ clientData.clientEmail || 'Email non fourni' }}</p>
            <p class="text-gray-600 text-sm">{{ clientData.clientAddress || 'Adresse du client' }}</p>
            <p class="text-gray-600 text-sm">{{ clientData.clientPhone || 'Téléphone non renseigné' }}</p>
          </div>
          
          <div class="text-right">
            <h3 class="font-semibold text-gray-500 mb-2">Date</h3>
            <p class="text-lg">{{ formatDate(invoiceData.issuedDate) || currentDate }}</p>
          </div>
        </div>
      </div>

      <!-- Articles/Produits -->
      <div class="p-8">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-300">
              <th class="text-left pb-4 font-semibold text-gray-500">Description</th>
              <th class="text-center pb-4 font-semibold text-gray-500">Quantité</th>
              <th class="text-right pb-4 font-semibold text-gray-500">Prix unitaire</th>
              <th class="text-right pb-4 font-semibold text-gray-500">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoiceItems" :key="index" class="border-b border-gray-100">
              <td class="py-4">{{ item.description || 'Article sans description' }}</td>
              <td class="text-center py-4">{{ item.quantity || 0 }}</td>
              <td class="text-right py-4">{{ formatCurrency(item.unitPrice || 0) }}</td>
              <td class="text-right py-4 font-semibold">{{ formatCurrency((item.unitPrice || 0) * (item.quantity || 0)) }}</td>
            </tr>
            
            <!-- Ligne vide si panier vide -->
            <tr v-if="invoiceItems.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-400">
                <i class="ri-shopping-cart-2-line text-2xl mb-2 block"></i>
                Aucun article ajouté
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total -->
      <div class="p-8 bg-gray-50">
        <div class="flex justify-end">
          <div class="w-64">
            <div class="flex justify-between py-2">
              <span class="font-semibold">Sous-total:</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="font-semibold">TVA (20%):</span>
              <span>{{ formatCurrency(tax) }}</span>
            </div>
            <div class="flex justify-between py-4 border-t border-gray-300 text-xl font-bold">
              <span>TOTAL:</span>
              <span class="text-blue-600">{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes et informations de paiement -->
      <div class="p-8 border-t border-gray-200">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold text-gray-500 mb-2">NOTES</h3>
            <p class="text-gray-600">{{ notesData.note || 'Aucune note spécifiée' }}</p>
            <p class="text-gray-600 mt-2">{{ notesData.gstNote || '' }}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-500 mb-2">INFORMATIONS DE PAIEMENT</h3>
            <p class="text-gray-600">{{ paymentData.method || 'Méthode non spécifiée' }}</p>
            <p class="text-gray-600">{{ paymentData.accountName || '' }}</p>
            <p class="text-gray-600">{{ paymentData.accountNumber || '' }}</p>
          </div>
        </div>
      </div>

      <!-- Pied de page -->
      <div class="p-8 bg-gray-100 text-center text-gray-500 text-sm">
        <p>{{ companyData.address || 'Adresse de votre entreprise' }} | {{ companyData.website || '' }}</p>
        <p class="mt-2">Merci pour votre confiance !</p>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'InvoicePreview',
  props: {
    companyData: {
      type: Object,
      default: () => ({})
    },
    clientData: {
      type: Object,
      default: () => ({})
    },
    invoiceData: {
      type: Object,
      default: () => ({})
    },
    invoiceItems: {
      type: Array,
      default: () => []
    },
    paymentData: {
      type: Object,
      default: () => ({})
    },
    notesData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // Générer un numéro de facture aléatoire
    const invoiceNumber = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Date actuelle
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    // Date d'échéance (30 jours)
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');

    // Formater les dates
    const formatDate = (dateString) => {
      if (!dateString) return '';
      try {
        return new Date(dateString).toLocaleDateString('fr-FR');
      } catch {
        return dateString;
      }
    };

    // Calculs financiers basés sur invoiceItems
    const subtotal = computed(() => {
      return props.invoiceItems.reduce((sum, item) => {
        return sum + ((item.unitPrice || 0) * (item.quantity || 0));
      }, 0);
    });

    const tax = computed(() => {
      return subtotal.value * 0.20; // 20% de TVA
    });

    const total = computed(() => {
      return subtotal.value + tax.value;
    });

    // Formater les prix
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF'
      }).format(amount);
    };

    return {
      invoiceNumber,
      currentDate,
      dueDate,
      subtotal,
      tax,
      total,
      formatCurrency,
      formatDate
    };
  }
}
</script>

<style scoped>
.preview-container {
  min-height: 800px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Animation d'apparition */
.preview-container {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>