<template>
  <div class="schedule-container">
    <h2>나의 일정</h2>

    <div class="schedule-list">
      <Accordion
        v-for="(category, categoryIndex) in schedules"
        :key="categoryIndex"
        :title="category.title"
        @remove="removeCategory(categoryIndex)"
      >
        <Accordion
          v-for="(chapter, chapterIndex) in category.chapters"
          :key="chapterIndex"
          :title="chapter.title"
          @remove="removeChapter(categoryIndex, chapterIndex)"
        >
          <AccordionSubList
            :items="chapter.subItems"
            @add="addSubItem(categoryIndex, chapterIndex)"
            @remove="removeSubItem(categoryIndex, chapterIndex, $event)"
          />
        </Accordion>
        <button class="add-button" @click="addChapter(categoryIndex)">+ 새로운 챕터 추가</button>
      </Accordion>
    </div>

    <button class="create-button" @click="addCategory">+ 새로운 일정 추가</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Accordion from "@/components/Accordion.vue";
import AccordionSubList from "@/components/AccordionSubList.vue";

const schedules = ref([
  {
    title: "상하이",
    chapters: [{ title: "Chapter 1", subItems: ["전망대 관람 (90분)"] }],
  },
  {
    title: "뉴욕",
    chapters: [{ title: "맨해튼 관광", subItems: ["센트럴 파크 산책 (120분)"] }],
  },
  {
    title: "파리",
    chapters: [{ title: "에펠탑 관광", subItems: ["에펠탑 야경 투어 (120분)"] }],
  },
]);

const addCategory = () => {
  schedules.value.push({ title: "새 일정", chapters: [] });
};

const removeCategory = (index) => {
  schedules.value.splice(index, 1);
};

const addChapter = (categoryIndex) => {
  schedules.value[categoryIndex].chapters.push({ title: "새로운 챕터", subItems: [] });
};

const removeChapter = (categoryIndex, chapterIndex) => {
  schedules.value[categoryIndex].chapters.splice(chapterIndex, 1);
};

const addSubItem = (categoryIndex, chapterIndex) => {
  schedules.value[categoryIndex].chapters[chapterIndex].subItems.push("새로운 일정 항목");
};

const removeSubItem = (categoryIndex, chapterIndex, subIndex) => {
  schedules.value[categoryIndex].chapters[chapterIndex].subItems.splice(subIndex, 1);
};
</script>

<style scoped>
.schedule-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.schedule-list {
  margin-bottom: 20px;
}

.create-button {
  width: 100%;
  padding: 12px;
  background: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background: #45a049;
}

.add-button {
  width: 100%;
  padding: 8px;
  background: #e0e0e0;
  border: none;
  text-align: left;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 4px;
}
</style>