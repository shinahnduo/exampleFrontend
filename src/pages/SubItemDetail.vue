<template>
  <div class="container">
    <Header />

    <div class="content">
      <!-- 사진 업로드 -->
      <div class="upload-section">
        <div class="upload-box" @click="triggerFileInput">
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="upload-preview" />
          <span v-else>사진 업로드</span>
        </div>
        <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
        <input v-model="title" type="text" placeholder="제목을 입력하세요" class="input-box" />
        <textarea v-model="description" placeholder="내용을 입력하세요" class="textarea-box"></textarea>
      </div>

      <!-- AI 생성 콘텐츠 -->
      <div class="ai-section">
        <h3>AI 생성 콘텐츠</h3>
        <div class="ai-content-box">
          {{ aiContent || "AI가 생성한 콘텐츠가 여기에 표시됩니다." }}
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="footer">
      <button class="gray-button">임시저장</button>
      <button class="white-button" @click="goBack">작성 취소</button>
      <button class="blue-button">다음 단계</button>
      <button @click="handleSaveDetail" class="blue-button">챕터 세부내용 저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useScheduleManager} from "@/components/api/scheduleManager";
import Header from "@/components/Header.vue";

const {
  saveChapterDetail
} = useScheduleManager();

const router = useRouter();

const title = ref("");
const description = ref("");
const aiContent = ref("");
const imagePreview = ref(null);
const fileInput = ref(null);
const selectedFile = ref(null); // 업로드할 파일을 저장

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; // 선택한 파일 저장
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// const saveImage = async () => {
//   if (!selectedFile.value) {
//     alert("업로드할 이미지를 선택해주세요.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", selectedFile.value);

//   try {
//     const response = await fetch("http://localhost:8000/image", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const result = await response.json();
//       alert(`이미지가 성공적으로 저장되었습니다: ${result.message}`);
//     } else {
//       alert("이미지 저장에 실패했습니다.");
//     }
//   } catch (error) {
//     console.error("이미지 저장 중 오류 발생:", error);
//     alert("이미지 저장 중 오류가 발생했습니다.");
//   }
// };

const handleSaveDetail = async () => {
  try {
    if (!title.value || !description.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // detail_data 구성
    const detailData = {
      title: title.value,
      content: description.value,
    };

    // API 호출
    const res = await saveChapterDetail(detailData, selectedFile.value);
    alert(res.message); // "챕터 세부내용 저장 성공"

    // 저장 성공 시 ReadDetail 페이지로 이동
    router.push(`/read/${res.detail.id}`); // URL에 detailId 추가
    
  } catch (error) {
    console.error("디테일 저장 실패:", error);
    alert("디테일 저장 중 오류가 발생했습니다.");
  }
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content {
  margin-bottom: 20px;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-box {
  width: 100%;
  height: 150px;
  background: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
}

.upload-preview {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.input-box,
.textarea-box {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.textarea-box {
  height: 100px;
  resize: none;
}

.ai-section {
  margin-top: 20px;
}

.ai-content-box {
  width: 100%;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #333;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.gray-button,
.white-button,
.blue-button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.gray-button {
  background: #ddd;
  color: #333;
}

.white-button {
  background: white;
  border: 1px solid #ddd;
  color: #333;
}

.blue-button {
  background: #4caf50;
  color: white;
}
</style>