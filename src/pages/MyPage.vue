<template>
  <div class="mypage-container">
    <h1>마이페이지</h1>
    <p>여기에서 사용자 정보를 확인하거나 설정을 변경할 수 있습니다.</p>
  </div>
</template>

<script>
export default {
  name: "MyPage",
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
</style>