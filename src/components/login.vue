<template>
  <div class="login">
    <div class="box">
      <i class="el-icon-close" @click="close_login"></i>
      <div class="content">
        <div class="nav">
                    <span :class="{active: login_method === 'is_pwd'}"
                          @click="change_login_method('is_pwd')">login</span>
          <span :class="{active: login_method === 'is_sms'}"
                @click="change_login_method('is_sms')">Email login</span>
        </div>
        <el-form v-if="login_method === 'is_pwd'">
          <el-input
              placeholder="Username/Email"
              prefix-icon="el-icon-user"
              v-model="username"
              clearable>
          </el-input>
          <el-input
              placeholder="password"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-button type="primary" @click="login_password">Login</el-button>
        </el-form>
        <el-form v-if="login_method === 'is_sms'">
          <el-input
              placeholder="Email"
              prefix-icon="el-icon-message"
              v-model="email"
              clearable
              @blur="check_email">
          </el-input>
          <el-input
              placeholder="code"
              prefix-icon="el-icon-chat-line-round"
              v-model="sms"
              clearable>
            <template slot="append">
              <span class="sms" @click="send_sms">{{ sms_interval }}</span>
            </template>
          </el-input>
          <el-button type="primary" @click="code_login">Login</el-button>
        </el-form>
        <div class="foot">
          <span @click="go_register">sign up now</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      email: '',
      sms: '',
      login_method: 'is_pwd',
      sms_interval: 'get code',
      is_send: false,
    }
  },
  methods: {
    close_login() {
      this.$emit('close')
    },
    go_register() {
      this.$emit('go')
    },
    change_login_method(method) {
      this.login_method = method;
    },
    check_email() {
      if (!this.email) return;
      if (!this.email.match(/^.+@.+$/)) {
        this.$message({
          message: 'Email format is wrong',
          type: 'warning',
          duration: 1000,
          onClose: () => {
            this.email = '';
          }
        });
        return false;
      }
      this.$axios.get(this.$settings.base_url+'/user/check_email/', {
        params:{email: this.email}
      }).then(response=>{
        if (response.data.code){
          this.is_send = true;
        } else {
          this.$message({
            message:'The Email is invalid.',
            type:'warning',
            duration:1000,
            onClose:()=>{
              this.email='';
            }
          });
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    send_sms() {

      if (!this.is_send) return;
      this.is_send = false;
      let sms_interval_time = 60;
      this.sms_interval = "sending...";

      this.$axios.get(this.$settings.base_url + '/user/send_email/', {params: {'email': this.email}})
                    .then(response => {
                        if (response.data.code) {
                            this.$message({
                                message: 'successfully sending the confirmation code.',
                                type: 'success',
                                duration: 1000,

                            });
                        }
                    })

      let timer = setInterval(() => {
        if (sms_interval_time <= 1) {
          clearInterval(timer);
          this.sms_interval = "Get Code";
          this.is_send = true; // 重新回复点击发送功能的条件
        } else {
          sms_interval_time -= 1;
          this.sms_interval = `${sms_interval_time}seconds retry`;
        }
      }, 1000);
    },
    login_password() {
      if (this.username && this.password) {
        this.$axios.post(this.$settings.base_url + '/user/login/', {
          username: this.username,
          password: this.password
        }).then(response=>{

          // save cookies
          this.$cookies.set('token', response.data.token, '7d')
          this.$cookies.set('username', response.data.username, '7d')
          // 子传父时间关闭登录框
          this.$emit('close')
          // 子传父一个加入token和username信息的action
          this.$emit('login_success')
        }).catch(errors=>{

        })
      } else {
        this.$notify({
          title: 'Warning',
          message: 'Please enter the both username and password.',
          type: 'warning'
        });
      }
    },
    code_login(){
      if (this.email && this.sms){
        this.$axios.post(this.$settings.base_url+'/user/code_login/', {
          email: this.email,
          code: this.sms
        }).then(response=>{
          this.$cookies.set('token', response.data.token, '7d')
          this.$cookies.set('username', response.data.username, '7d')
          this.$emit('login_success')
          this.$emit('close')
        }).catch(errors=>{
          console.log(errors)
        })
      } else {
        this.$message({
          message:'The email and code are needed.',
          type:'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 400px;
  height: 420px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  top: calc(50vh - 210px);
  left: calc(50vw - 200px);
}

.el-icon-close {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.el-icon-close:hover {
  color: darkred;
}

.content {
  position: absolute;
  top: 40px;
  width: 280px;
  left: 60px;
}

.nav {
  font-size: 20px;
  height: 38px;
  border-bottom: 2px solid darkgrey;
}

.nav > span {
  margin: 0 20px 0 35px;
  color: darkgrey;
  user-select: none;
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: 2px solid darkgrey;
}

.nav > span.active {
  color: black;
  border-bottom: 3px solid black;
  padding-bottom: 9px;
}

.el-input, .el-button {
  margin-top: 40px;
}

.el-button {
  width: 100%;
  font-size: 18px;
}

.foot > span {
  float: right;
  margin-top: 20px;
  color: orange;
  cursor: pointer;
}

.sms {
  color: orange;
  cursor: pointer;
  display: inline-block;
  width: 70px;
  text-align: center;
  user-select: none;
}
</style>