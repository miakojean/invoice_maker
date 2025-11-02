<template>
    <div class="accordion-container">
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="checkbox" v-model="isOpen" />
            <div class="collapse-title flex justify-between items-center">
                <span class="text-base font-light">{{ title }}</span>
            </div>
            <div class="collapse-content text-sm w-full flex flex-col gap-4">
                <div v-for="(row, rowIndex) in fields" :key="rowIndex" class="w-full flex gap-4">
                    <div
                        v-for="field in row" 
                        :key="field.name"
                        :class="getFieldClass(field)"
                    >
                        <inputFamily 
                            :label="field.label"
                            :placeholder="field.placeholder"
                            :input-type="field.type || 'text'"
                            :model-value="getFieldValue(field)"
                            @update:model-value="updateFieldValue(field, $event)"
                            class="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import inputFamily from '../input/inputFamily.vue';

export interface AccordionField {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    span?: number; // 1-12 pour la largeur (comme Tailwind)
    value?: string | number;
}

export interface AccordionProps {
    title: string;
    fields: AccordionField[][]; // Tableau de lignes, chaque ligne contient des champs
    modelValue?: Record<string, string | number>;
}

export default defineComponent({
    name: 'Accordion',
    components: {
        inputFamily,
    },
    props: {
        title: {
            type: String,
            required: true
        },
        fields: {
            type: Array as () => AccordionField[][],
            required: true
        },
        modelValue: {
            type: Object as () => Record<string, string | number>,
            default: () => ({})
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isOpen = ref<boolean>(false);

        // Calculer la classe pour chaque champ en fonction de son span
        const getFieldClass = (field: AccordionField) => {
            const span = field.span || 1;
            return `flex-${span}`;
        };

        // Obtenir la valeur d'un champ
        const getFieldValue = (field: AccordionField) => {
            return props.modelValue?.[field.name] || field.value || '';
        };

        // Mettre à jour la valeur d'un champ
        const updateFieldValue = (field: AccordionField, value: string | number) => {
            const updatedValues = {
                ...props.modelValue,
                [field.name]: value
            };
            emit('update:modelValue', updatedValues);
        };

        return {
            isOpen,
            getFieldClass,
            getFieldValue,
            updateFieldValue
        };
    }
});
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}

.accordion-container{
    min-width: 500px;
}
/* Classes pour les spans personnalisés */
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }
.flex-3 { flex: 3; }
.flex-4 { flex: 4; }
.flex-5 { flex: 5; }
.flex-6 { flex: 6; }
.flex-7 { flex: 7; }
.flex-8 { flex: 8; }
.flex-9 { flex: 9; }
.flex-10 { flex: 10; }
.flex-11 { flex: 11; }
.flex-12 { flex: 12; }
</style>