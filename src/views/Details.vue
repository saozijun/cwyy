<template>
  <div class="page-container">
    <div class="header">
      <span class="close-icon" @click="goHome">×</span>
      <h1 class="title">预约详情</h1>
      <span class="more-icon">···</span>
    </div>

    <div v-if="reservations.length > 0" class="table-container">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>手机号</th>
            <th>预约床位</th>
            <th>日期</th>
            <th>安排床位</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in reservations" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.phone.substring(0, 3) + "..." }}</td>
            <td>{{ item.bedType }}</td>
            <td>{{ formatTime(item.createdAt) }}</td>
            <td>
              <button
                v-if="item.status === 'pending'"
                class="action-btn"
                @click="showArrangeModal(item)"
              >
                安排
              </button>
              <span v-else class="arranged-text">已安排</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-state">
      <p>暂无预约记录</p>
    </div>

    <transition name="modal-fade">
      <div
        v-if="isModalVisible"
        class="modal-overlay"
        @click.self="cancelArrange"
      >
        <div class="modal-content">
          <button class="modal-close" @click="cancelArrange">×</button>
          <div class="modal-icon">
            <svg
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="white"
                stroke="#1DD1A1"
                stroke-width="4"
              />
              <path
                d="M26 41.5L36.5 52L54.5 34"
                stroke="#1DD1A1"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="modal-message">
            {{ currentReservation?.name }}床位安排成功!
          </p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="cancelArrange">取消</button>
            <button class="btn-confirm" @click="confirmArrange">确定</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const reservations = ref([]);
const isModalVisible = ref(false);
const currentReservation = ref(null);

const formatTime = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

onMounted(() => {
  const data = localStorage.getItem("reservations");
  if (data) {
    reservations.value = JSON.parse(data);
  }
});

const showArrangeModal = (reservation) => {
  currentReservation.value = reservation
  // 立即更新状态
  const index = reservations.value.findIndex(r => r.id === reservation.id)
  if (index !== -1) {
    reservations.value[index].status = 'arranged'
    localStorage.setItem('reservations', JSON.stringify(reservations.value))
  }
  isModalVisible.value = true
}

const confirmArrange = () => {
  isModalVisible.value = false
  router.push('/notifications')
}

const cancelArrange = () => {
  isModalVisible.value = false
  router.push('/notifications')
}

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.page-container {
  background-color: #f7f8fa;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.close-icon,
.more-icon {
  font-size: 1.5rem;
  cursor: pointer;
}
.more-icon {
  font-weight: bold;
  letter-spacing: 2px;
}
.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}
.table-container {
  margin: 1rem;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
th,
td {
  padding: 0.8rem 0.5rem;
  font-size: 0.75rem;
}
thead {
  background-color: #f2f2f2;
}
th {
  font-weight: 600;
  color: #333;
}
tbody tr {
  border-bottom: 1px solid #f0f0f0;
}
tbody tr:last-child {
  border-bottom: none;
}
td {
  color: #666;
}
.action-btn {
  background-color: #1dd1a1;
  color: white;
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}
.arranged-text {
  color: #999;
  font-size: 0.8rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 350px;
  text-align: center;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
}
.modal-icon {
  margin-bottom: 1rem;
}
.modal-message {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2rem;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
.modal-actions button {
  width: 48%;
  padding: 0.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
}
.btn-cancel {
  background: #f1f1f1;
  border: 1px solid #ececec;
  color: #333;
}
.btn-confirm {
  background: #1dd1a1;
  border: none;
  color: white;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.empty-state {
  text-align: center;
  padding-top: 5rem;
  color: #999;
  font-size: 1rem;
}
</style>
