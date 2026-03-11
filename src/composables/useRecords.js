import { ref, computed } from "vue";

const records = ref(JSON.parse(localStorage.getItem("records") || "[]"));;

const STORAGE_KEY = "records";

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    records.value = JSON.parse(stored);
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value));
}

loadFromStorage();

export function useRecords() {
  const totalRecords = computed(() => records.value.length);
  const totalPrice = computed(() => {
    return records.value.reduce(
      (sum, r) => sum + (parseFloat(r.price) || 0),
      0,
    );
  });

function addRecord(record) {
    const newRecord = {
      id: Date.now(),
      category: record.category || 'outros',
      ...record,
      createdAt: new Date().toISOString(),
    };
    records.value.unshift(newRecord);
    saveToStorage();
    return newRecord;
}

  function getRecord(id) {
    return records.value.find((r) => r.id === parseInt(id));
  }

  function updateRecord(id, updates) {
    const index = records.value.findIndex((r) => r.id === parseInt(id));
    if (index !== -1) {
      records.value[index] = {
        ...records.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveToStorage();
      return records.value[index];
    }
    return null;
  }

  function deleteRecord(id) {
    records.value = records.value.filter((r) => r.id !== parseInt(id));
    saveToStorage();
  }

  return {
    // Estado
    records,

    // Computed
    totalRecords,
    totalPrice,

    // Métodos
    addRecord,
    getRecord,
    updateRecord,
    deleteRecord,
  };
}
