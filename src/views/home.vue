<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '../components/Toast.vue'

const router = useRouter()
const toast = ref(null)

const formData = reactive({
  name: '',
  gender: '女',
  age: '',
  idCard: '',
  phone: '',
  mixedLiving: true,
  bedType: '单人间',
  agreeTerms: true
})

const handleSubmit = () => {
  if (!formData.name || !formData.age || !formData.idCard || !formData.phone) {
    toast.value.show('请完整填写患者信息')
    return
  }
  if (!formData.agreeTerms) {
    toast.value.show('请同意相关条款')
    return
  }
  
  const reservations = JSON.parse(localStorage.getItem('reservations')) || []
  const newReservation = { 
    ...formData, 
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  }
  reservations.push(newReservation)
  localStorage.setItem('reservations', JSON.stringify(reservations))
  
  router.push('/success')
}

const goToDetails = () => {
  router.push('/details')
}

const goToNotifications = () => {
  router.push('/notifications')
}
</script>

<template>
  <div class="page-container">
    <Toast ref="toast" />
    <div class="header">
      <span class="close-icon">×</span>
      <h1 class="title">信息填报</h1>
      <span class="more-icon">· · ·</span>
    </div>
    <div class="banner"></div>
    <div class="form-container">
      <div class="form-section-title">患者信息</div>
      <!-- <button type="button" class="notifications-link" @click="goToNotifications">服务通知</button> -->
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="name" class="required">姓名</label>
          <input type="text" id="name" v-model="formData.name" placeholder="请输入真实姓名" />
        </div>
        <div class="form-item">
          <label class="required">性别</label>
          <div class="gender-select">
            <button type="button" :class="{ active: formData.gender === '男' }" @click="formData.gender = '男'">男</button>
            <button type="button" :class="{ active: formData.gender === '女' }" @click="formData.gender = '女'">女</button>
          </div>
        </div>
        <div class="form-item">
          <label for="age" class="required">年龄</label>
          <input type="number" id="age" v-model="formData.age" placeholder="请输入真实年龄" />
        </div>
        <div class="form-item">
          <label for="idCard" class="required">证件号码</label>
          <input type="text" id="idCard" v-model="formData.idCard" placeholder="请输入身份证号" />
        </div>
        <div class="form-item">
          <label for="phone" class="required">手机号码</label>
          <input type="tel" id="phone" v-model="formData.phone" placeholder="请输入电话号码" />
        </div>
        <div class="form-item">
          <label>是否同意男女混住</label>
          <div class="checkbox-container">
            <input type="checkbox" id="mixedLiving-yes" :checked="formData.mixedLiving" @change="formData.mixedLiving = true" class="custom-checkbox" />
            <label for="mixedLiving-yes" class="checkbox-label">是</label>
            <input type="checkbox" id="mixedLiving-no" :checked="!formData.mixedLiving" @change="formData.mixedLiving = false" class="custom-checkbox" />
            <label for="mixedLiving-no" class="checkbox-label">否</label>
          </div>
        </div>
        <div class="form-item column">
          <label class="bed-label">床位选择</label>
          <div class="radio-group">
            <div class="radio-option">
              <input type="radio" id="single" value="单人间" v-model="formData.bedType" />
              <label for="single">单人间 ¥200/天</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="double" value="双人间" v-model="formData.bedType" />
              <label for="double">双人间 ¥52/天</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="five" value="五人间" v-model="formData.bedType" />
              <label for="five">五人间 ¥29/天</label>
            </div>
          </div>
        </div>

        <div class="terms">
          <input type="checkbox" id="agreeTerms" v-model="formData.agreeTerms" class="custom-checkbox" />
          <label for="agreeTerms"> 本人已如实填写姓名、住址、手机号码等住院信息，且已核对无误。
            本人同意使用该手机号码接收床位预约信息，如因信息填写错误或
            变更等原因导致无法正常接收短信通知、办理住院的，相应后果由
            本人自行承担。
          </label>
        </div>

        <button type="submit" class="submit-btn">预约</button>
        <!-- <button type="button" class="details-btn" @click="goToDetails">查看预约</button> -->
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: #f7f8fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.close-icon,
.more-icon {
  font-size: 1.5rem;
  color: #333;
  font-weight: 300;
}

.more-icon {
  font-weight: bold;
  letter-spacing: -2px;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.banner {
  height: 120px;
  background-color: #4a90e2;
  background: url('../assets/bg.png') no-repeat;
  background-size: cover;
}

.form-container {
  background-color: #fff;
  margin: -20px 15px 0;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding-bottom: 2rem;
}

.form-section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 12px;
}

.form-section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background-color: #1dd1a1;
  border-radius: 2px;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.form-item:last-of-type {
  border-bottom: none;
}

.form-item.column {
  flex-direction: column;
  align-items: flex-start;
  border-bottom: none;
}
.form-item.column .bed-label {
  margin-bottom: 1rem;
}

.form-item > label {
  color: #333;
  width: 120px;
  flex-shrink: 0;
}

.form-item > label.required::before {
  content: '*';
  color: red;
  margin-left: 2px;
  margin-right: 2px;
}

.form-item input[type='text'],
.form-item input[type='number'],
.form-item input[type='tel'] {
  border: none;
  text-align: right;
  flex-grow: 1;
  outline: none;
  font-size: 1rem;
  width: 100%;
}

.form-item input::placeholder {
  color: #ccc;
}

.gender-select {
  display: flex;
}

.gender-select button {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.3rem 1.2rem;
  border-radius: 15px;
  margin-left: 0.5rem;
  color: #333;
}

.gender-select button.active {
  background-color: #e8f8f5;
  color: #1dd1a1;
  border-color: #1dd1a1;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-container .checkbox-label {
  margin: 0 1.5rem 0 0.5rem;
  color: #333;
  width: auto;
}

.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  flex-shrink: 0;
}

.custom-checkbox:checked {
  background-color: #1dd1a1;
  border-color: #1dd1a1;
}

.custom-checkbox:checked::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-group {
  width: 100%;
}

.radio-option {
  margin-bottom: 0.8rem;
}
.radio-option:last-child {
  margin-bottom: 0;
}
.radio-option input[type='radio'] {
  display: none;
}
.radio-option label {
  display: flex;
  align-items: center;
  color: #666;
  width: 100%;
}
.radio-option label::before {
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 10px;
  background-color: white;
}
.radio-option input[type='radio']:checked + label::before {
  border-color: #1dd1a1;
  background-color: #fff;
  box-shadow: 0 0 0 4px #1dd1a1 inset;
}

.terms {
  margin-top: 1.5rem;
  display: flex;
  align-items: flex-start;
}

.terms label {
  color: #999;
  font-size: 0.8rem;
  line-height: 1.5;
  vertical-align: middle;
  margin-left: 8px;
  width: auto;
}

.submit-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #1dd1a1;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
}

.details-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
}

.notifications-link {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #1dd1a1;
  font-weight: 600;
  cursor: pointer;
}
</style>
