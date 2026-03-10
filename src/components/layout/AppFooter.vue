<script setup>
const props = defineProps({
    showBack: Boolean,
    title: String,
    filter: {
        type: String,
        default: 'todos'
    }
});

// A chave aqui é o nome do evento 'update:filter'
const emit = defineEmits(['update:filter', 'back']);

const setFilter = (value) => {
    console.log("Clicou no botão, valor:", value); // Isso aparece no F12?
    alert("Clicou no botão: " + value);            // Isso aparece na tela?
    emit('update:filter', value);
};
</script>

<template>
    <footer class="app-footer">
        <div class="spacer"></div>
        <button v-if="showBack" @click="$emit('back')" class="btn-back">←</button>

        <h1>{{ title }}</h1>

        <div class="lista">
            <ul class="lista1">
                <li>
                    <button @click="setFilter('outros')" :class="{ active: filter === 'outros' }">
                        <span class="mdi mdi-dots-horizontal"></span>
                    </button>
                </li>
                <li>
                    <button @click="setFilter('transporte')" :class="{ active: filter === 'transporte' }">
                        <span class="mdi mdi-train-car"></span>
                    </button>
                </li>
            </ul>

            <div>
                <RouterLink to="/records/new/edit" class="menu-item">
                    <button>
                        <span class="mdi mdi-plus-circle" id="plus"></span>
                    </button>
                </RouterLink>
            </div>

            <ul class="lista2">
                <li>
                    <button @click="setFilter('alimentacao')" :class="{ active: filter === 'alimentacao' }">
                        <span class="mdi mdi-food"></span>
                    </button>
                </li>
                <li>
                    <button @click="setFilter('todos')" :class="{ active: filter === 'todos' }">
                        <span class="mdi mdi-home"></span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="spacer"></div>
    </footer>
</template>

<style scoped>
.app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 56px;
    background: #ff8da1;
    color: black;
    display: flex;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px 20px 0px 0px;
    z-index: 100;
}

.app-footer h1 {
    font-size: 18px;
    font-weight: 600;
    flex: 1;
}

.spacer {
    width: 40px;
}

.lista {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.lista ul {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.lista ul li button,
.lista > div button {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.lista button.active span {
    color: #333 !important;
}

.lista span {
    font-size: 26px;
    color: white;
}

.lista > div button {
    transform: translateY(-8px);
}

#plus {
    font-size: 36px;
}
</style>