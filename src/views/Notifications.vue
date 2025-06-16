<template>
  <div class="notification-page">
    <Nav title="服务通知">
      <template #right>
        <div class="icons-right">
          <img src="../assets/search.png" alt="" />
          <img src="../assets/menu.png" alt="" />
        </div>
      </template>
    </Nav>
    <main class="main-content">
      <div v-if="reservations.length > 0">
        <template v-for="reservation in reservations" :key="reservation.id">
          <div class="date-divider">
            <span>{{ formatDividerDateTime(reservation.createdAt) }}</span>
          </div>

          <div class="notification-card">
            <div class="card-header">
              <div class="card-title">
                <span class="bell-icon">
                  <img src="../assets/icon.png" alt="" />
                </span>
                床位预约成功通知
              </div>
              <span class="more-icon">···</span>
            </div>
            <div class="card-body">
              <h3 class="sub-title">就诊提醒/预约结果反馈通知</h3>
              <p class="time">
                <span>时间</span>
                {{ formatAppointmentTime(reservation.createdAt) }}
              </p>
              <p class="message">
                【某某医院】尊敬的{{ reservation.name
                }}{{
                  reservation.gender == "女" ? "女士" : "先生"
                }}：您好,您的床位已预约成功,请您确认时间后会尽快到达/及时就医或急诊处理！谢谢配合。
              </p>
            </div>
            <div class="card-footer">
              <span>进入小程序查看</span>
              <span class="arrow">
                <img src="../assets/r.png" alt="" />
              </span>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="empty-state">
        <p>暂无通知</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const reservations = ref([]);
const router = useRouter();

const formatDividerDateTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "下午" : "上午";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${month}月${day}日 ${period}${hours}:${formattedMinutes}`;
};

const formatAppointmentTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  date.setDate(date.getDate() + 2);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

onMounted(() => {
  const data = localStorage.getItem("reservations");
  if (data) {
    reservations.value = JSON.parse(data)
      .filter((r) => r.status === "arranged")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
});
const back = () => {
  router.push("/details");
};
</script>

<style scoped>
.notification-page {
  background-color: #f4f4f4;
  min-height: 100vh;
  color: #333;
}
.icons-right img{
  width: 20px;
}
.icons-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
.main-content {
  padding: 1rem;
}
.entry-link-card {
  background-color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.arrow {
  width: 15px;
}
.arrow img {
  width: 100%;
  position: relative;
  top: 1px;
}
.date-divider {
  text-align: center;
  margin-bottom: 1.1rem;
}
.date-divider span {
  background-color: #e0e0e0;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
.notification-card {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 1.1rem;
  overflow: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
}
.card-title {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.bell-icon {
  width: 24px;
  height: 24px;
}
.bell-icon img {
  width: 100%;
}
.tea-icon {
  font-size: 0.7rem;
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
.more-icon {
  color: #bbb;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
}
.card-body {
  padding: 0 1rem 1rem;
}
.sub-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
}
.time {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}
.time span {
  font-size: 0.9rem;
  font-weight: 400;
  margin-right: 10px;
}
.message {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}
.card-footer {
  border-top: 1px solid #f0f0f0;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #333;
}
.coupon-info {
  font-size: 0.9rem;
  color: #666;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.info-row .label {
  color: #999;
}
.info-row .value {
  color: #333;
}
.empty-state {
  text-align: center;
  padding-top: 5rem;
  color: #999;
  font-size: 1rem;
}
</style>
