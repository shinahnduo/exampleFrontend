<!-- src/views/Callback.vue -->
<template>
  <div>
    <p>로그인 처리 중입니다...</p>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  async mounted() {
    const store = useStore();
    const router = useRouter();

    const hash = window.location.hash.substring(1); // #access_token=...
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    console.log(accessToken);
    if (accessToken) {
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const userInfo = await userInfoRes.json();
        console.log('✅ 구글 사용자 정보:', userInfo);
        // 예: userInfo.email, userInfo.name, userInfo.picture 등

        // Vuex에 로그인 처리 (원한다면)
        await store.dispatch('auth/googleLogin', {
          email: userInfo.email, // 이게 access_token임 (여기선 id_token이라는 이름으로 넘기지만 백에서 확인)
          name: userInfo.name,
          client_id: '1045727623358-v2o1k3kskfaeh8g3pajg2de5v0suvspv.apps.googleusercontent.com'
        });

        router.push('/');
      } catch (err) {
        alert('로그인 중 오류 발생');
        console.error(err);
      }
    } else {
      alert('Google 로그인 토큰이 존재하지 않습니다.');
    }
  }
}
</script>