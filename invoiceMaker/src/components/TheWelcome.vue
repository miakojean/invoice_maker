<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column - Form -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Product</h1>
          <div class="space-y-3">
            <!-- Item Row -->
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span class="font-medium">Summer 2K23 T-shirt</span>
              <span class="text-gray-600">1.00%</span>
            </div>
            
            <!-- Add New Line -->
            <button class="w-full text-left text-blue-600 font-medium p-3 border border-dashed border-gray-300 rounded">
              Add New Line
            </button>
          </div>
        </div>

        <!-- Options Section -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Additional Options</h2>
          
          <!-- Checkbox Group 1 -->
          <div class="space-y-3 mb-6">
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Add Coupon</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="checkbox" checked class="rounded border-gray-300">
              <span class="font-medium">Add Discount</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Summer Sale 10th</span>
            </label>
          </div>

          <div class="border-t pt-4 space-y-3">
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Terms & Condition</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="checkbox" checked class="rounded border-gray-300">
              <span class="font-medium">Attachment</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Product List PDF</span>
              <span class="text-sm text-gray-500">512kb</span>
            </label>
          </div>

          <div class="border-t pt-4 space-y-3">
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Customer notes</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="checkbox" class="rounded border-gray-300">
              <span>Footer</span>
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t pt-6">
          <p class="text-sm text-gray-600 mb-6">Last saved: Today at 4:30 PM</p>
          <div class="flex space-x-3">
            <button class="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Send invoice
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column - Preview -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Preview</h2>
        
        <!-- Invoice Header -->
        <div class="mb-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">INV2398-08-087</h3>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="font-medium">Due date</p>
              <p class="text-gray-600">10 November 2023</p>
            </div>
            <div>
              <p class="font-medium">Subject</p>
              <p class="text-gray-600">Service per November 2023</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm mt-4">
            <div>
              <p class="font-medium">Billed to</p>
              <p class="text-gray-600">John Smith</p>
              <p class="text-gray-600">john_w@gmail.com</p>
            </div>
            <div>
              <p class="font-medium">Currency</p>
              <p class="text-gray-600">IDR - Indonesia Rupiah</p>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="mb-6">
          <div class="grid grid-cols-12 gap-2 text-sm font-medium border-b pb-2 mb-2">
            <div class="col-span-6">DESCRIPTION</div>
            <div class="col-span-2 text-center">QTY</div>
            <div class="col-span-2 text-right">UNIT PRICE</div>
            <div class="col-span-2 text-right">AMOUNT</div>
          </div>
          
          <div class="grid grid-cols-12 gap-2 text-sm py-2">
            <div class="col-span-6 flex items-center">
              <input type="checkbox" checked class="mr-2 rounded border-gray-300">
              <span>Summer 2K23 T-shirt</span>
            </div>
            <div class="col-span-2 text-center">1</div>
            <div class="col-span-2 text-right">125,000 IDR</div>
            <div class="col-span-2 text-right">125,000 IDR</div>
          </div>
        </div>

        <!-- Totals -->
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>125,000 IDR</span>
          </div>
          <div class="flex justify-between">
            <span>Discount -10%</span>
            <span>12,500 IDR</span>
          </div>
          <div class="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span>112,800 IDR</span>
          </div>
          <div class="flex justify-between font-bold text-blue-600">
            <span>Amount due</span>
            <span>112,800 IDR</span>
          </div>
        </div>

        <!-- Attachment -->
        <div class="mt-6 p-4 bg-gray-50 rounded">
          <div class="flex items-center space-x-2">
            <input type="checkbox" checked class="rounded border-gray-300">
            <span class="font-medium">Attachment</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceEditor'
}
</script>

<style scoped>
/* Styles supplémentaires si nécessaires */
</style>