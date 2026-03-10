<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useRecords } from '@/composables/useRecords';

const router = useRouter();
const route = useRoute();
const { addRecord, getRecord, updateRecord } = useRecords();

const isEditMode = computed(() => route.params.id !== 'new');

const categories = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'outros', label: 'Outros' },
];

const form = ref({
  title: '',
  price: '',
  notes: '',
  category: ''
});

onMounted(() => {
  if (isEditMode.value) {
    const record = getRecord(route.params.id);
    if (record) {
      form.value = {
        title: record.title,
        price: record.price,
        notes: record.notes || '',
        category: record.category || '',
      };
    } else {
      router.push('/records');
    }
  }
});

function handleSubmit() {
  if (!form.value.title || !form.value.price) {
    alert('Preencha os campos obrigatórios');
    return;
  }

  if (isEditMode.value) {
    updateRecord(route.params.id, form.value);
  } else {
    addRecord(form.value);
  }

  router.push('/');
}
</script>

<template>
  <div>
    <AppHeader
      :title="isEditMode ? 'Editar Registro' : 'Novo Registro'"
      show-back
      @back="router.back()"
    />

    <div class="page">
      <form @submit.prevent="handleSubmit" class="form">
        <AppInput
          v-model="form.title"
          label="Título"
          placeholder="Ex: Café"
          required
        />

        <AppInput
          v-model.number="form.price"
          label="Preço (reais)"
          type="number"
          placeholder="Ex: 10"
          required
        />

        <AppInput
        v-model="form.category"
        label="Categoria"
        :options="categories"
        placeholder="Selecione a categoria"
        required
      />

        <div class="textarea-group">
          <label class="label">Observações</label>
          <textarea
            v-model="form.notes"
            rows="4"
            class="textarea"
            placeholder="Adicione observações sobre a compra..."
          ></textarea>
        </div>

        <AppButton type="submit">
          {{ isEditMode ? 'Salvar alterações' : 'Criar registro' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.textarea-group {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}

.textarea:focus {
  outline: none;
  border-color: #0b5cff;
}

</style>