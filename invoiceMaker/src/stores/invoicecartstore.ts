import { ref } from "vue";
import { defineStore } from "pinia";

// Définition d'un type pour les items du panier
export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description?: string; // Optionnel
}

export const useInvoiceStore = defineStore('invoice', () => {
    
    const cartItems = ref<CartItem[]>([]);

    // Méthode pour ajouter un item au panier
    const addToCart = (item: Omit<CartItem, 'id'> | CartItem) => {
        // Si l'item n'a pas d'id, on lui en génère un
        const itemWithId: CartItem = 'id' in item 
            ? item 
            : { ...item, id: Date.now() }; // Utilise le timestamp comme ID unique

        // Vérifie si l'item existe déjà dans le panier
        const existingItemIndex = cartItems.value.findIndex(cartItem => 
            cartItem.id === itemWithId.id
        );

        if (existingItemIndex !== -1) {
            // Si l'item existe déjà, on met à jour la quantité
            cartItems.value[existingItemIndex].quantity += itemWithId.quantity;
        } else {
            // Sinon, on ajoute le nouvel item
            cartItems.value.push(itemWithId);
        }
    };

    // Méthode pour supprimer un item du panier
    const removeFromCart = (itemId: number) => {
        cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    };

    // Méthode pour mettre à jour la quantité d'un item
    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        const item = cartItems.value.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    };

    // Méthode pour vider tout le panier
    const clearCart = () => {
        cartItems.value = [];
    };

    // Getter pour le total du panier
    const cartTotal = () => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Getter pour le nombre total d'items
    const totalItems = () => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems
    }
});