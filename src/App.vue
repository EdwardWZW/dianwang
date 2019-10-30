<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss" scoped>
html, body {
  margin:0;
  padding:0;
  width:100%;
}
@media (max-width: 320px)
{
  html{font-size: 100px;}
}
@media (min-width: 321px) and 
(max-width:375px)
{
  html{font-size: 120px;}
}
@media (min-width: 375px)
{
  html{font-size: 140px;}
}
div,p,h1,h2,h3,h4,h5,span,a {
  box-sizing: border-box;
  text-align: left;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
