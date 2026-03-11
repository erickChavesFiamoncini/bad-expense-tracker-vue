<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
import RecordCard from '@/components/records/RecordCard.vue';
import { useRecords } from '@/composables/useRecords';
import { watch } from 'vue';

const { records } = useRecords();

const currentFilter = ref('todos');

const filteredRecords = computed(() => {
    if (currentFilter.value === 'todos') {
        return records.value;
    }
    return records.value.filter(record => record.category === currentFilter.value);
});

watch(currentFilter, (novoValor) => {
    console.log("O filtro mudou para:", novoValor);
});

function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('pt-BR');
}

const setCurrentFilter = (value) => {
    console.log('oi')
    console.log(value)
    currentFilter.value = value
}

const labelsCategorias = {
    todos: 'Todos os registros',
    alimentacao: 'Alimentação',
    lazer: 'Lazer',
    transporte: 'Transporte',
};

</script>

<template>
    <AppHeader title="Controle de Gastos Rápido" />
    <div>
        <div class="page">
            <span class="filtroSelecionado">
                {{ labelsCategorias[currentFilter] || currentFilter }}
            </span>

            <div v-if="filteredRecords.length > 0" class="list">
                <RouterLink v-for="record in filteredRecords" :key="record.id" :to="`/records/${record.id}`"
                    class="link">
                    <RecordCard :id="record.id" :title="record.title" :price="record.price"
                        :date="formatDate(record.createdAt)" :category="record.category" />
                </RouterLink>
            </div>

            <div v-else class="empty">
                <p>📭</p>
                <p>Nenhum registro ainda</p>
                <RouterLink to="/records/new/edit" class="btn">
                    Criar primeiro registro
                </RouterLink>
            </div>
        </div>
    </div>
    <AppFooter :filter="currentFilter" @changeFilter="setCurrentFilter" />
</template>

<style scoped>
.page {
    padding-bottom: 80px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.link {
    text-decoration: none;
}

.empty {
    text-align: center;
    padding: 60px 20px;
    color: #999;
}

.empty p:first-child {
    font-size: 48px;
    margin-bottom: 16px;
}

.btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background: #ff8da1;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
}

.fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: #0b5cff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    text-decoration: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.fab:active {
    transform: scale(0.9);
}

.filtroSelecionado {
    /* Centralização */
    display: block;
    /* Faz o span ocupar a linha toda para aceitar text-align */
    width: fit-content;
    /* O fundo só ocupa o tamanho do texto */
    margin: 0 auto 24px auto;
    /* Centraliza horizontalmente e dá espaço para a lista abaixo */
    text-align: center;

    /* Estilo "Pill" (Pilulazinha) */
    background-color: #f0f2f5;
    color: #666;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;

    /* Espaçamento e Bordas */
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;

    /* Suavidade */
    transition: all 0.3s ease;
}
</style>