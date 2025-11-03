<template>
    <div class="accordion-container">
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="checkbox" v-model="isOpen" />
            <div class="collapse-title flex justify-between items-center">
                <span class="text-base font-light">{{ title }}</span>
                <span class="text-xs text-gray-500">{{ itemsCount }} articles</span>
            </div>
            <div class="collapse-content text-sm w-full flex flex-col gap-4">
                <!-- En-tête du tableau -->
                <div class="w-full flex gap-2 text-xs font-semibold text-gray-500 border-b pb-2">
                    <div class="flex-2">Description</div>
                    <div class="flex-1 text-center">Quantité</div>
                    <div class="flex-1 text-right">Prix unitaire</div>
                    <div class="flex-1 text-right">Total</div>
                    <div class="w-8"></div>
                </div>

                <!-- Lignes d'articles -->
                <div v-for="(item, index) in invoiceItems" :key="index" class="w-full flex gap-2 items-center">
                    <div class="flex-2">
                        <inputFamily 
                            label=""
                            placeholder="Description de l'article"
                            :model-value="item.description"
                            @update:model-value="updateItemField(index, 'description', $event)"
                            class="w-full"
                        />
                    </div>
                    <div class="flex-1">
                        <inputFamily 
                            label=""
                            placeholder="1"
                            input-type="number"
                            :model-value="item.quantity"
                            @update:model-value="updateItemField(index, 'quantity', $event)"
                            class="text-center"
                        />
                    </div>
                    <div class="flex-1">
                        <inputFamily 
                            label=""
                            placeholder="0.00"
                            input-type="number"
                            :model-value="item.unitPrice"
                            @update:model-value="updateItemField(index, 'unitPrice', $event)"
                            class="text-right"
                        />
                    </div>
                    <div class="flex-1 text-right font-semibold text-gray-700">
                        {{ calculateItemTotal(item) }} FCFA
                    </div>
                    <div class="w-8">
                        <button 
                            @click="removeItem(index)"
                            class="text-red-500 hover:text-red-700 transition-colors"
                        >
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>

                <!-- Bouton pour ajouter un nouvel article -->
                <button 
                    @click="addNewItem"
                    class="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                    <i class="ri-add-line"></i>
                    Ajouter un article
                </button>

                <!-- Résumé -->
                <div class="w-full flex justify-end mt-4">
                    <div class="w-64 space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Sous-total:</span>
                            <span class="font-semibold">{{ calculateSubtotal() }} FCFA</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">TVA (20%):</span>
                            <span class="font-semibold">{{ calculateTax() }} FCFA</span>
                        </div>
                        <div class="flex justify-between border-t pt-2">
                            <span class="text-gray-800 font-bold">Total:</span>
                            <span class="text-blue-600 font-bold text-lg">{{ calculateTotal() }} FCFA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import inputFamily from '../input/inputFamily.vue';

export interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface AccordionProps {
    title: string;
    modelValue?: InvoiceItem[];
}

export default defineComponent({
    name: 'InvoiceItemsAccordion',
    components: {
        inputFamily,
    },
    props: {
        title: {
            type: String,
            required: true,
            default: 'Éléments de la facture'
        },
        modelValue: {
            type: Array as () => InvoiceItem[],
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isOpen = ref<boolean>(false);

        // Items de la facture
        const invoiceItems = computed({
            get: () => props.modelValue || [],
            set: (value) => emit('update:modelValue', value)
        });

        // Compter les articles
        const itemsCount = computed(() => invoiceItems.value.length);

        // Ajouter un nouvel article
        const addNewItem = () => {
            const newItem: InvoiceItem = {
                id: Date.now(),
                description: '',
                quantity: 1,
                unitPrice: 0
            };
            invoiceItems.value = [...invoiceItems.value, newItem];
        };

        // Supprimer un article
        const removeItem = (index: number) => {
            invoiceItems.value = invoiceItems.value.filter((_, i) => i !== index);
        };

        // Mettre à jour un champ d'un article
        const updateItemField = (index: number, field: keyof InvoiceItem, value: string | number) => {
            const updatedItems = [...invoiceItems.value];
            
            if (field === 'quantity' || field === 'unitPrice') {
                value = Number(value) || 0;
            }
            
            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value
            };
            
            invoiceItems.value = updatedItems;
        };

        // Calculer le total d'un article
        const calculateItemTotal = (item: InvoiceItem) => {
            return (item.quantity * item.unitPrice).toFixed(2);
        };

        // Calculer le sous-total
        const calculateSubtotal = () => {
            return invoiceItems.value.reduce((total, item) => {
                return total + (item.quantity * item.unitPrice);
            }, 0).toFixed(2);
        };

        // Calculer la TVA
        const calculateTax = () => {
            const subtotal = parseFloat(calculateSubtotal());
            return (subtotal * 0.20).toFixed(2);
        };

        // Calculer le total
        const calculateTotal = () => {
            const subtotal = parseFloat(calculateSubtotal());
            const tax = parseFloat(calculateTax());
            return (subtotal + tax).toFixed(2);
        };

        return {
            isOpen,
            invoiceItems,
            itemsCount,
            addNewItem,
            removeItem,
            updateItemField,
            calculateItemTotal,
            calculateSubtotal,
            calculateTax,
            calculateTotal
        };
    }
});
</script>

<style scoped>
.accordion-container {
    min-width: 500px;
}
</style>