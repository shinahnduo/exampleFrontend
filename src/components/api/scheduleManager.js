import { ref, onMounted } from "vue";
import axios from "axios";

const schedules = ref([]);

export const useScheduleManager = () => {
    const fetchMainPageData = async () => {
        try {
            const jwt_token = localStorage.getItem("jwt_token");
            console.log(jwt_token)
            if (!jwt_token) throw new Error("로그인 필요");

            const res = await axios.get("http://localhost:8000/main", {
                headers: { Authorization: `Bearer ${jwt_token}` }
            });

            schedules.value = res.data.map((schedule) => ({
                ...schedule,
                chapters: schedule.chapters.map((chapter) => ({
                    ...chapter,
                    subItems: chapter.details.map((d) => `${d.title} (${d.content})`),
                    details: chapter.details
                }))
            }));
        } catch (err) {
            console.error("스케줄 불러오기 실패 ❌", err);
        }
    };

    const addSchedule = async () => {
        const jwt_token = localStorage.getItem("jwt_token");
        const newSchedule = {
            title: "새 일정",
            date: new Date().toISOString().split("T")[0],
            time: "09:00",
            description: "설명 없음"
        };
        const res = await axios.post("http://localhost:8000/schedule", newSchedule, {
            headers: { Authorization: `Bearer ${jwt_token}` }
        });
        schedules.value.push({ ...res.data, chapters: [] });
    };

    const removeSchedule = async (index) => {
        const jwt_token = localStorage.getItem("jwt_token");
        const id = schedules.value[index].id;
        await axios.delete(`http://localhost:8000/schedule/${id}`, {
            headers: { Authorization: `Bearer ${jwt_token}` }
        });
        schedules.value.splice(index, 1);
    };

    const addChapter = async (scheduleIndex) => {
        const jwt_token = localStorage.getItem("jwt_token");
        const scheduleId = schedules.value[scheduleIndex].id;
        const res = await axios.post(
            `http://localhost:8000/schedule/${scheduleId}/chapter`,
            { title: "새로운 챕터", description: "설명 없음" },
            { headers: { Authorization: `Bearer ${jwt_token}` } }
        );
        schedules.value[scheduleIndex].chapters.push({
            ...res.data,
            subItems: [],
            details: []
        });
    };

    const removeChapter = async (scheduleIndex, chapterIndex) => {
        const jwt_token = localStorage.getItem("jwt_token");
        const scheduleId = schedules.value[scheduleIndex].id;
        const chapterId = schedules.value[scheduleIndex].chapters[chapterIndex].id;
        await axios.delete(
            `http://localhost:8000/schedule/${scheduleId}/chapter/${chapterId}`,
            { headers: { Authorization: `Bearer ${jwt_token}` } }
        );
        schedules.value[scheduleIndex].chapters.splice(chapterIndex, 1);
    };

    const addSubItem = async (scheduleIndex, chapterIndex) => {
        const jwt_token = localStorage.getItem("jwt_token");
        const scheduleId = schedules.value[scheduleIndex].id;
        const chapterId = schedules.value[scheduleIndex].chapters[chapterIndex].id;
        const newDetail = { title: "새로운 세부 일정", content: "내용 없음", imageUrl: null };

        const res = await axios.post(
            `http://localhost:8000/schedule/${scheduleId}/chapter/${chapterId}/detail`,
            newDetail,
            { headers: { Authorization: `Bearer ${jwt_token}` } }
        );

        schedules.value[scheduleIndex].chapters[chapterIndex].subItems.push(
            `${res.data.title} (${res.data.content})`
        );
        schedules.value[scheduleIndex].chapters[chapterIndex].details.push(res.data);
    };

    const removeSubItem = async (scheduleIndex, chapterIndex, subIndex) => {
        const jwt_token = localStorage.getItem("jwt_token");
        const scheduleId = schedules.value[scheduleIndex].id;
        const chapterId = schedules.value[scheduleIndex].chapters[chapterIndex].id;
        const detailId = schedules.value[scheduleIndex].chapters[chapterIndex].details[subIndex]?.id;

        await axios.delete(
            `http://localhost:8000/schedule/${scheduleId}/chapter/${chapterId}/detail/${detailId}`,
            { headers: { Authorization: `Bearer ${jwt_token}` } }
        );

        schedules.value[scheduleIndex].chapters[chapterIndex].subItems.splice(subIndex, 1);
        schedules.value[scheduleIndex].chapters[chapterIndex].details.splice(subIndex, 1);
    };

    const updateScheduleTitle = async (index, newTitle) => {
        const token = localStorage.getItem("jwt_token");
        const schedule = schedules.value[index];

        await axios.put(`http://localhost:8000/schedule/${schedule.id}`, {
            title: newTitle
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        schedule.title = newTitle;
    };

    const updateChapterTitle = async (scheduleIndex, chapterIndex, newTitle) => {
        const token = localStorage.getItem("jwt_token");
        const schedule = schedules.value[scheduleIndex];
        const chapter = schedule.chapters[chapterIndex];

        await axios.put(`http://localhost:8000/schedule/${schedule.id}/chapter/${chapter.id}`, {
            title: newTitle
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        chapter.title = newTitle;
    };

    onMounted(() => {
        fetchMainPageData();
    });

    return {
        schedules,
        addSchedule: addSchedule,
        removeSchedule: removeSchedule,
        addChapter,
        removeChapter,
        addSubItem,
        removeSubItem,
        updateScheduleTitle,
        updateChapterTitle
    };
};
