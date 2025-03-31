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

<script>
import { ref, nextTick } from "vue";

export default {
  name: 'EditableTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const newTitle = ref(props.title);
    const titleInput = ref<HTMLInputElement | null>(null);

    const editTitle = () => {
      isEditing.value = true;
      nextTick(() => {
        titleInput.value?.focus();
      });
    };

    const saveTitle = () => {
      if (newTitle.value.trim() === "") {
        newTitle.value = props.title; // 빈 값이면 원래 제목 유지
      }
      isEditing.value = false;
      emit("update:title", newTitle.value);
    };

    return {
      isEditing,
      newTitle,
      titleInput,
      editTitle,
      saveTitle
    };
  }
}
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
  user-select: none; /* 텍스트 선택 방지 */
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
