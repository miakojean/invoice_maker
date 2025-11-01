<template>
  <main class="w-full min-h-screen bg-gray-50 p-8 flex justify-center items-center">
    <div class="w-full max-w-6xl flex flex-col gap-8">
      <h2 class="text-4xl font-semibold text-center text-gray-800">Générer une facture</h2>
      
      <form class="w-full grid grid-cols-1 md:grid-cols-2 gap-8" @submit.prevent="generateInvoice">
        
        <!-- Informations du client -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold mb-4 text-gray-700">Informations du client</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <inputFamily
                label="Nom complet client/entreprise"
                v-model="invoice.client.name"
                placeholder="John Doe"
                required
              />
              <inputFamily 
                label="Email client/entreprise"
                v-model="invoice.client.email"
                placeholder="john@example.com"
                type="email"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <inputFamily 
                label="Adresse client/entreprise"
                v-model="invoice.client.address"
                placeholder="123 Rue Principale"
              />
              <inputFamily
                label="Numéro de téléphone" 
                v-model="invoice.client.phone"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
        </div>

        <!-- Informations de la facture -->
        <div class="bg-white p-6 rounded-lg shadow-sm">

          <h3 class="text-xl font-semibold mb-4 text-gray-700">Informations de la facture</h3>
          
          <div class="space-y-4">
            
            <div class="grid grid-cols-2 gap-4">
              <inputSimple placeholder="Votre référence"/>
              <mainButton/>
            </div>
            <div class="w-full grid grid-cols-2 gap-4">
              <inputFamily 
                label="Date de prestation" 
                input-type="date" 
                v-model="invoice.issueDate"
              />
              <inputFamily 
                label="Date d'envoi" 
                input-type="date" 
                v-model="invoice.issueDate"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <selectFamily/>
              <inputSimple input-type="Number" placeholder="Entrer Tva Ex:18"/>
            </div>
          </div>
        </div>

        <!-- Articles de la facture -->
        <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold mb-4 text-gray-700">Articles</h3>
          <div class="space-y-4">
            <div v-for="(item, index) in invoice.items" :key="index" 
              class="grid grid-cols-12 gap-4 items-end border-b pb-4">
              <div class="col-span-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <inputFamily
                  label="Nom de l'article"
                  v-model="item.description"
                  placeholder="Description de l'article"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
                <input 
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Prix unitaire</label>
                <input 
                  v-model.number="item.unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Total</label>
                <div class="px-3 py-2 bg-gray-50 rounded-md text-gray-700">
                  {{ (item.quantity * item.unitPrice).toFixed(2) }} {{ invoice.currency }}
                </div>
              </div>
              <div class="col-span-1">
                <button 
                  type="button" 
                  @click="removeItem(index)"
                  class="w-full p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <button 
              type="button" 
              @click="addItem"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700"
            >
              + Ajouter un article
            </button>
          </div>
        </div>

        <!-- Totaux et actions -->
        <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Résumé -->
            <div>
              <h3 class="text-xl font-semibold mb-4 text-gray-700">Résumé</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{{ calculateSubtotal().toFixed(2) }} {{ invoice.currency }}</span>
                </div>
                <div class="flex justify-between">
                  <span>TVA ({{ invoice.taxRate }}%):</span>
                  <span>{{ calculateTax().toFixed(2) }} {{ invoice.currency }}</span>
                </div>
                <div class="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>{{ calculateTotal().toFixed(2) }} {{ invoice.currency }}</span>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col justify-end space-y-4">
              <div class="flex space-x-4">
                <button 
                  type="button"
                  @click="resetForm"
                  class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Réinitialiser
                </button>
                <button 
                  type="submit"
                  class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Générer la facture
                </button>
              </div>
              <button 
                type="button"
                @click="downloadPDF"
                class="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Télécharger en PDF
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  </main>
</template>

<script>
import { ref, reactive } from 'vue';
import inputFamily from '@/components/input/inputFamily.vue';
import mainButton from '../components/button/mainButton.vue';
import inputSimple from '@/components/input/inputSimple.vue';
import selectFamily from '@/components/input/selectFamily.vue';

export default {
  name: 'InvoiceGenerator',
  components: {
    inputFamily,
    inputSimple,
    selectFamily,
    mainButton
  },
  setup() {
    const invoice = reactive({
      client: {
        name: '',
        email: '',
        address: '',
        phone: '',
        siret: ''
      },
      invoiceNumber: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      subject: '',
      currency: 'EUR',
      taxRate: 20,
      items: [
        {
          description: '',
          quantity: 1,
          unitPrice: 0
        }
      ]
    });

    const addItem = () => {
      invoice.items.push({
        description: '',
        quantity: 1,
        unitPrice: 0
      });
    };

    const removeItem = (index) => {
      if (invoice.items.length > 1) {
        invoice.items.splice(index, 1);
      }
    };

    const calculateSubtotal = () => {
      return invoice.items.reduce((total, item) => {
        return total + (item.quantity * item.unitPrice);
      }, 0);
    };

    const calculateTax = () => {
      return calculateSubtotal() * (invoice.taxRate / 100);
    };

    const calculateTotal = () => {
      return calculateSubtotal() + calculateTax();
    };

    const generateInvoice = () => {
      console.log('Facture générée:', invoice);
      alert('Facture générée avec succès!');
    };

    const downloadPDF = () => {
      alert('Fonctionnalité PDF à implémenter');
    };

    const resetForm = () => {
      Object.assign(invoice, {
        client: {
          name: '',
          email: '',
          address: '',
          phone: '',
          siret: ''
        },
        invoiceNumber: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        subject: '',
        currency: 'EUR',
        taxRate: 20,
        items: [
          {
            description: '',
            quantity: 1,
            unitPrice: 0
          }
        ]
      });
    };

    return {
      invoice,
      addItem,
      removeItem,
      calculateSubtotal,
      calculateTax,
      calculateTotal,
      generateInvoice,
      downloadPDF,
      resetForm
    };
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaires */
</style>