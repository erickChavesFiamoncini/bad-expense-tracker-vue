<template>
<AppHeader title="Controle de Gastos Rapido" />
    <RouterView/>
<AppFooter/>
</template>

<script setup>
import { computed, ref } from 'vue';

import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';



const total = computed(() => {
    return expenses.value.reduce((sum, item) => sum + Number(item.value || 0), 0);
});

function addExpense() {
    if (!title.value.trim() || !value.value.trim()) {
        alert('Preencha tudo');
        return;
    }
    expenses.value.push({
        id: Date.now(),
        title: title.value,
        value: value.value,
        category: category.value || 'other',
    });
    title.value = '';
    value.value = '';
    category.value = '';
}

function removeExpense(id) {
    expenses.value = expenses.value.filter((item) => item.id !== id);
}

function clearAll() {
    if (!confirm('Tem certeza?')) {
        return;
    }
    expenses.value = [];
}
</script>
<style>
@import './assets/css/global.css';
</style>
