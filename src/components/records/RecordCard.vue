<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useRecords } from '@/composables/useRecords';
import Swal from 'sweetalert2';

const props = defineProps({
  id: Number,
  title: String,
  duration: Number,
  price: Number,
  date: String,
  category: String,
});

const record = ref(null);

const router = useRouter();
const route = useRoute();
const { deleteRecord } = useRecords();

const categoryIcons = {
  alimentacao: 'mdi-food',
  transporte: 'mdi-train-car',
  outros: 'mdi-dots-horizontal',
};

const iconName = computed(() => {
  const categoria = props.category || 'outros'; 
  
  return categoryIcons[categoria] || 'mdi-help-circle';
});

function handleDelete() {
  Swal.fire({
    title: 'Tem certeza?',
    text: `Deseja excluir o registro "${props.title}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff8da1',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRecord(props.id);
      // Opcional: Um aviso de sucesso
      Swal.fire('Excluído!', 'O registro foi removido.', 'success');
    }
  });
}
function goToDetails() {
  router.push(`/records/${props.id}`);
}

</script>

<template>
  <div class="record-card" @click="goToDetails">
    
    <div id="status">

      <div class="left">
        <div id="icon">
          <span class="mdi" :class="iconName"></span>
        </div>
      </div>

      <div class="right">
        <h3 class="title">{{ title }}</h3>
        <div class="meta">
          <span class="price">R$ {{ price }}</span>
        </div>
      </div>

    </div>

    <div id="trash-can">
      <button id="trash" @click.stop.prevent="handleDelete">
        <span class="mdi mdi-trash-can-outline"></span>
      </button>
    </div>
 
  </div> 
  
</template>

<style scoped>
.record-card {
  background: white;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: transform 0.1s;
  cursor: pointer;
}

.record-card:active {
  transform: scale(0.98);
}

#status {
  display: flex;
}

#icon {
  background: #ff8da1;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-size: 24px;      
  color: white;
}

#trash-can {
  align-items: center;
  display: flex;
}

#trash {
  background: none;
  border: none;
  font-size: 20px;
  color: red;
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #111;
}

.meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}
.swal2-confirm{
  background-color:#ff8da1;
}
</style>