<template>
  <section class="h-full p-4 flex justify-center items-center bg-gray-100">
    <div class="preview-container bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl">
      <!-- En-tête de la facture -->
      <div class="invoice-header text-gray p-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-xl font-bold mb-2">Facture</h1>
            <p class="text-gray-400 text-sm">N° <span class="font-mono bg-white/20 px-2 py-1 rounded">{{ invoiceNumber }}</span></p>
          </div>
          <div class="text-right">
            <h2 class="text-xl font-semibold">{{ companyData.companyName || 'Votre entreprise' }}</h2>
            <p class="text-gray-400 text-sm">{{ companyData.email || 'email@entreprise.com' }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client et date -->
      <div class="p-8 border-b border-gray-200">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold text-gray-500 mb-2">client</h3>
            <p class="text-lg font-semibold">{{ clientData.clientName || 'Nom du client' }}</p>
            <p class="text-gray-600">{{ clientData.clientEmail || 'email@client.com' }}</p>
            <p class="text-gray-600">{{ clientData.clientAddress || 'Adresse du client' }}</p>
          </div>
          <div class="text-right">
            <h3 class="font-semibold text-gray-500 mb-2">date</h3>
            <p class="text-lg">{{ currentDate }}</p>
            <div class="mt-4">
              <h3 class="font-semibold text-gray-500 mb-2">ÉCHÉANCE</h3>
              <p class="text-lg">{{ dueDate }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles/Produits -->
      <div class="p-8">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-300">
              <th class="text-left pb-4 font-semibold text-gray-500">DESCRIPTION</th>
              <th class="text-center pb-4 font-semibold text-gray-500">QUANTITÉ</th>
              <th class="text-right pb-4 font-semibold text-gray-500">PRIX UNITAIRE</th>
              <th class="text-right pb-4 font-semibold text-gray-500">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index" class="border-b border-gray-100">
              <td class="py-4">{{ item.name }}</td>
              <td class="text-center py-4">{{ item.quantity }}</td>
              <td class="text-right py-4">{{ formatCurrency(item.price) }}</td>
              <td class="text-right py-4 font-semibold">{{ formatCurrency(item.price * item.quantity) }}</td>
            </tr>
            
            <!-- Ligne vide si panier vide -->
            <tr v-if="cartItems.length === 0">
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

      <!-- Pied de page -->
      <div class="p-8 bg-gray-100 text-center text-gray-500 text-sm">
        <p>{{ companyData.phone || 'Tél: 01 23 45 67 89' }} | {{ companyData.address || 'Adresse de votre entreprise' }}</p>
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
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // Générer un numéro de facture aléatoire
    const invoiceNumber = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Date actuelle
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    // Date d'échéance (30 jours)
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');

    // Calculs financiers
    const subtotal = computed(() => {
      return props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
        currency: 'EUR'
      }).format(amount);
    };

    return {
      invoiceNumber,
      currentDate,
      dueDate,
      subtotal,
      tax,
      total,
      formatCurrency
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