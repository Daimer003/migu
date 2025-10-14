<script setup lang="ts">
import AuthGuard from '@/components/auth/AuthGuard.vue';
import OrdersTable from '@/components/dashboard/OrdersTable.vue';
import ProductsTable from '@/components/dashboard/ProductsTable.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import { ref } from 'vue';

const tab = ref("products")
</script>

<template> <AuthGuard>
    <DashboardLayout :tab="tab" @change-tab="tab = $event">
       
            <ProductsTable v-if="tab === 'products'" />
            <OrdersTable v-else />

    </DashboardLayout>
            </AuthGuard>
</template>
