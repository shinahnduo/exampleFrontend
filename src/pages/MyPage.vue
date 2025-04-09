<template>
  <div class="mypage-container">
    <h1>마이페이지</h1>
    <p>여기에서 사용자 정보를 확인하거나 설정을 변경할 수 있습니다.</p>

    <!-- 사용자 정보 -->
    <div class="user-info">
      <h2>사용자 정보</h2>
      <p><strong>이메일:</strong> {{ userInfo.email }}</p>
      <p><strong>이름:</strong> {{ userInfo.name }}</p>
      <p><strong>가입일:</strong> {{ userInfo.joinDate }}</p>
    </div>

    <!-- 로그아웃 및 회원탈퇴 버튼 -->
    <div class="actions">
      <button class="logout-button" @click="logout">로그아웃</button>
      <button class="delete-account-button" @click="deleteAccount">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MyPage",
  computed: {
    // Vuex에서 사용자 정보 가져오기
    ...mapState({
      userInfo: (state) => state.user || {}, // Vuex의 user 상태
    }),
  },
  methods: {
    // 로그아웃 기능
    logout() {
      localStorage.removeItem("token"); // 토큰 삭제
      alert("로그아웃 되었습니다.");
      this.$router.push("/login"); // 로그인 페이지로 이동
    },
    // 회원탈퇴 기능
    deleteAccount() {
      if (confirm("정말로 회원탈퇴를 하시겠습니까?")) {
        // 회원탈퇴 API 호출 (예시)
        fetch("http://localhost:8000/auth/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("회원탈퇴가 완료되었습니다.");
              localStorage.removeItem("token"); // 토큰 삭제
              this.$router.push("/signup"); // 회원가입 페이지로 이동
            } else {
              alert("회원탈퇴에 실패했습니다.");
            }
          })
          .catch((error) => {
            console.error("회원탈퇴 오류:", error);
            alert("회원탈퇴 중 오류가 발생했습니다.");
          });
      }
    },
  },
  mounted() {
    // Vuex에 사용자 정보가 없으면 localStorage에서 가져오기
    if (!this.userInfo.email) {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storedUserInfo) {
        this.$store.commit("setUser", storedUserInfo); // Vuex에 사용자 정보 저장
      }
    }
  },
};
</script>

<style scoped>
.mypage-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  color: #555;
}

.user-info {
  margin: 20px 0;
  text-align: left;
}

.user-info h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-button {
  background-color: #4caf50;
  color: white;
}

.logout-button:hover {
  background-color: #45a049;
}

.delete-account-button {
  background-color: #e53935;
  color: white;
}

.delete-account-button:hover {
  background-color: #d32f2f;
}
</style>