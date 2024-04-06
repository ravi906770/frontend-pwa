import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {

  // type form ={
  //   name : string,
  //   age : number,

  // }

  const [form, setForm] = React.useState({});
	const formStyle = {
		marginTop: 10,
		marginLeft: 20,
		border: "1px solid #491d8d",
		padding: 10,
		borderRadius: 5,
		maxWidth: 300
	}

  const options = {
    isOpen: true,
    // ...other configurations
    theme: {
    primaryColor: '#42b0c5',
    secondaryColor: '#491d8d',
      fontFamily: ' sans-serif',
    },
    audio: {
      disabled: false,
    },
    header: {
      title: 'Zip Money',
      backgroundColor: '#42b0c5',
      textColor: '#ffffff',
      showAvatar: true, 
  },
    // ...other styles
  };
  

  const flow = {
    start: {
        message: "Hello there! What is your name?",
        function: (params: any) => setForm({ ...form, name: params.userInput }),
        path: "ask_age"
    },
    ask_age: {
        message: (params: any) => `Nice to meet you ${params.userInput}, what is your age?`,
        function: (params: any) => setForm({ ...form, age: params.userInput }),
        path: "ask_tutorial"
    },
    ask_tutorial: {
      message: (params: any) => `Do you need the tutorial for this website?`,
      options: ["Yes", "No"],
      function: (params: any) => setForm({ ...form, ask_tutorial: params.userInput }),
      path: "ask_track"
  },
    ask_track: {
        message: "Do you track your expenses everyday?",
        options: ["Yes", "No"],
        chatDisabled: true,
        function: (params: any) => setForm({ ...form, track_expense: params.userInput }),
        path: "ask_choice"
    },
    ask_choice: {
      message: "Please select at least 2 reasons for tracking your expenses on a daily basis:",
      checkboxes: { items: ["To manage my budget", "To identify spending patterns", "To reduce unnecessary expenses", "To achieve financial goals"], min: 2 },
      chatDisabled: true,
      function: (params: any) => setForm({ ...form, expense_reasons: params.userInput }),
      path: "ask_expense_category"
  },
    // ask_work_days: {
    //     message: "?",
    //     function: (params: any) => setForm({ ...form, num_work_days: params.userInput }),
    //     path: "ask_expense_category"
    // },
    ask_expense_category: {
        message: "What category does your expense fall into?",
        options: ["Food", "Travel", "Hospital", "Shopping", "Rent"],
        chatDisabled: true,
        function: (params: any) => setForm({ ...form, expense_category: params.userInput }),
        path: "ask_expense_amount"
    },
    ask_expense_amount: {
        message: "Please enter the amount of your expense:",
        function: (params: any) => setForm({ ...form, expense_amount: params.userInput }),
        path: "end"
    },
    end: {
        message: "Thank you for providing the information!",
        options: ["New Application"],
        chatDisabled: true,
        path: "start"
    },
};


    
  return (
    <ChatBot  flow={flow} options={options}/>
  );
};

export default MyChatBot;