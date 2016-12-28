<template>
	<div>
	    <headerbar></headerbar>
	    <div class="login-box">
	    	<h4>{{title}}</h4>
	    	<div class="login-input">
	    		<input type="text" name="username" v-model="username">
	    		<label v-bind:class="{hasvalue: username !== ''}" for="username">login username</label>	
	    		<i class="glyphicon glyphicon-user"></i>
	    	</div>
	    	<div class="login-input">
	    		<input type="password" name="password" v-model="password">
    			<label v-bind:class="{hasvalue: password !== ''}" for="password">login password</label>
	    		<i class="glyphicon glyphicon-lock"></i>
	    	</div>
	    	<div class="check-box">
	    		<input type="checkbox" name="remember">
	    		<label for="remember">remember me</label>
	    	</div>
	    	<div class="row submit-box">
    			<div class="col-lg-6 col-sm-6 ta-center">
	    			<button class="btn btn-success" @click="login()"><i class="glyphicon glyphicon-user"></i>LOGIN</button>
    			</div>
    			<div class="col-lg-6 col-sm-6 ta-center">
    				<button class="btn btn-primary" v-on:click="goPage()"><i class="glyphicon glyphicon-plus-sign"></i>REGISTER</button>
    			</div>
	    	</div>
	    </div>
	    <footerbar></footerbar>	
	</div>
</template>

<script>
import Headerbar from './Header.vue'
import Footerbar from './Footer.vue'

export default {
  name: 'login',
  data () {
    return {
      title: 'User Login',
      username: '',
      password: ''
    }
  },
  components: {
  	Headerbar,
  	Footerbar
  },
  methods: {
  	goPage: function() {
  		this.$router.push('/register');
  	},
  	login: function () {
  		this.$router.push('/home');
  	}

  }
}
</script>

<!-- add "scoped" this style just work in this component-->
<style scoped>
	label{
		font-weight: 400;
	}
	.check-box {
		width: 50%;
		margin: 0 auto;
	}
	.check-box input {
		margin: 0;
		width: 2rem;
		height: 2rem;
		vertical-align: middle;
		color: green;
	}
	.check-box label {
		font-size: 16px;	
		line-height: 2rem;
		vertical-align: middle;
		margin: 0 0 0 1rem;
	}
	.submit-box {
		margin: 3rem auto;
		width: 50%;
	}
	.submit-box button {
		border-radius: .2rem;
		width: 15rem;
		margin: 1rem auto;
		height: 4rem;
		box-shadow: 0 .2rem .2rem #858585;
	}
	.submit-box i{
		margin-right: 1rem;
		font-size: 1.6rem;
	}
</style>
