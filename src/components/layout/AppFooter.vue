<script setup>
import { computed, ref } from 'vue';
defineEmits(['back']);

const expenses = ref([
    { id: 1, title: 'Cafe', value: 6, category: 'alimentacao', icon: 'mdi mdi-food' },
    { id: 2, title: 'Onibus', value: 4.5, category: 'transporte', icon: 'mdi mdi-train-car' },
    { id: 3, title: 'Lanche', value: 12, category: 'alimentacao', icon: 'mdi mdi-food'},
]);

const title = ref('');
const value = ref('');
const category = ref('');
const filter = ref('all');

const filtered = computed(() => {
    if (filter.value === 'all') {
        return expenses.value;
    }
    return expenses.value.filter((item) => item.category === filter.value);
});

</script>

<template>
  <footer class="app-footer">
    <div class="spacer"></div>
    <button v-if="showBack" @click="$emit('back')" class="btn-back">←</button>
    <h1>{{ title }}</h1>
    <div class="lista">
        <ul class="lista1">
            <li>
                <button @click="filter = 'outros'">
                <span class="mdi mdi-dots-horizontal"></span>
                </button>
            </li>
            <li>
                <button @click="filter = 'transporte'">
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
                <button @click="filter = 'alimentacao'">
                <span class="mdi mdi-food"></span>
                </button>
            </li>
            <li>
                <button @click="filter = 'todos'">
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
  color: white;
  display: flex;         
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  z-index: 100;
}

.btn-back {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
}

.app-footer h1 {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
}

.spacer {
  width: 40px; /* Espaço para balancear o botão de voltar */
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
}

.lista span {
    font-size: 26px;
    color: white;
}

.lista > div button {
    transform: translateY(-8px);
}

.lista button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
}

#plus{
    font-size: 36px;
}
</style>