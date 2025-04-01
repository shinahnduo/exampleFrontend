<template>
  <div class="editable-title">
    <!-- 입력 모드 -->
    <input
        v-if="isEditing"
        v-model="newTitle"
        ref="titleInput"
        class="title-input"
        @keyup.enter="saveTitle"
        @blur="saveTitle"
    />

    <!-- 일반 모드 (더블 클릭 시 수정 모드 활성화) -->
    <h3 v-else @dblclick="editTitle" class="title-text">{{ newTitle }}</h3>

    <!-- 저장 버튼 (편집 중일 때만 보임) -->
    <button v-if="isEditing" class="save-button" @click="saveTitle">✔️</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, nextTick } from "vue";

const props = defineProps({
  title: String
});
const emit = defineEmits(["update:title"]);

const isEditing = ref(false);
const newTitle = ref(props.title);
const titleInput = ref(null);

// 더블 클릭 시 제목 수정 모드 활성화
const editTitle = async () => {
  isEditing.value = true;
  await nextTick();
  if (titleInput.value) {
    titleInput.value.focus();
  }
};

// 제목 저장
const saveTitle = () => {
  if (newTitle.value.trim() === "") {
    newTitle.value = props.title;
  }
  isEditing.value = false;
  emit("update:title", newTitle.value);
};

// props 변경 시 동기화
watch(
    () => props.title,
    (newVal) => {
      newTitle.value = newVal;
    }
);
</script>

<style scoped>
.editable-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
}

.title-text {
  cursor: pointer;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}

.title-input {
  flex-grow: 1;
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
