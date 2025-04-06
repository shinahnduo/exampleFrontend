<template>
  <div class="schedule-container">
    <h2>나의 일정</h2>

    <div class="schedule-list">
      <Accordion
        v-for="(schedule, scheduleIndex) in schedules"
        :key="scheduleIndex"
        :title="schedule.title"
        @remove="removeSchedule(scheduleIndex)"
        @update:title="(newTitle) => updateScheduleTitle(scheduleIndex, newTitle)"
      >
        <Accordion
          v-for="(chapter, chapterIndex) in schedule.chapters"
          :key="chapterIndex"
          :title="chapter.title"
          @remove="removeChapter(scheduleIndex, chapterIndex)"
          @update:title="(newTitle) => updateChapterTitle(scheduleIndex, chapterIndex, newTitle)"
        >
          <AccordionSubList
            :items="chapter.subItems"
            @add="addSubItem(scheduleIndex, chapterIndex)"
            @remove="removeSubItem(scheduleIndex, chapterIndex, $event)"
          />
        </Accordion>
        <button class="add-button" @click="addChapter(scheduleIndex)">+ 새로운 챕터 추가</button>
      </Accordion>
    </div>

    <button class="create-button" @click="addSchedule">+ 새로운 일정 추가</button>
  </div>
</template>

<script setup>
import Accordion from "@/components/Accordion.vue";
import AccordionSubList from "@/components/AccordionSubList.vue";
import {useScheduleManager} from "./api/scheduleManager";

const {
  schedules,
  addSchedule,
  removeSchedule,
  addChapter,
  removeChapter,
  addSubItem,
  removeSubItem,
  updateScheduleTitle,
  updateChapterTitle
} = useScheduleManager();
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