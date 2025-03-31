<template>
  <div class="schedule-container">
    <h2>일정</h2>

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

    <!-- 하단 고정 버튼 -->
    <button class="create-button" @click="addCategory">새로운 일정 생성하기</button>
  </div>
</template>

<script>
import { ref } from "vue";
import Accordion from "./Accordion.vue";
import AccordionSubList from "./AccordionSubList.vue";

export default {
  name: 'ScheduleList',
  components: {
    Accordion,
    AccordionSubList
  },
  setup() {
    const schedules = ref([
      { title: "상하이", chapters: [{ title: "Chapter 1", subItems: ["전망대 관람 (90분)"] }] },
      { title: "뉴욕", chapters: [{ title: "맨해튼 관광", subItems: ["센트럴 파크 산책 (120분)"] }] },
      { title: "파리", chapters: [{ title: "에펠탑 관광", subItems: ["에펠탑 야경 투어 (120분)"] }] },
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

    return {
      schedules,
      addCategory,
      removeCategory,
      addChapter,
      removeChapter,
      addSubItem,
      removeSubItem
    };
  }
}
</script>

<style scoped>
/* 전체 컨테이너 */
.schedule-container {
  width: 100%;
  max-width: 400px;
  height: 740px; /* 고정 높이 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
}

/* 스크롤 가능한 리스트 */
.schedule-list {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 버튼 영역만큼 여백 추가 */
  -webkit-overflow-scrolling: touch; /* 모바일 터치 스크롤 지원 */
}

/* 하단 고정 버튼 */
.create-button {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  max-width: 400px;
}

/* 챕터 추가 버튼 */
.add-button {
  width: 100%;
  padding: 8px;
  background: #e0e0e0;
  border: none;
  text-align: left;
  cursor: pointer;
  margin-top: 5px;
}
</style>
