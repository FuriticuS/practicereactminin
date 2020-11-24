import React from 'react';
import Layout from "./Components/HOC/Layout";
import Quiz from "./Components/containers/Quiz/Quiz";
import {Route, Switch} from "react-router-dom";
import Auth from "./Components/containers/Auth/Auth";
import QuizCreator from "./Components/containers/QuizCreator/QuizCreator";
import QuizList from "./Components/containers/QuizList/QuizList";

function App() {
  return (
      <Layout>
          <Switch>
              <Route path='/auth' exact render={()=> <Auth />}/>
              <Route path='/quiz-creator' render={()=> <QuizCreator />}/>
              <Route path='/quiz/:id' render={(props)=> <Quiz {...props}/>}/>
              <Route path='/' render={()=> <QuizList />}/>
          </Switch>
      </Layout>
  );
}

export default App;
