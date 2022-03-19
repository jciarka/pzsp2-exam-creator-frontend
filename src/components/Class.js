import React from 'react'
import "./Class.css"
import TaskPoolList from './TaskPoolList'
import MembersList from './MembersList'

export default function Class() {
    var task_pools = [
    {
      id: 1,
      name: "kolokwium 1"
    },
    {
      id: 2,
      name: "kolokwium 2"
    },
    {
      id: 3,
      name: "egzamin"
    },
    {
      id: 4,
      name: "egzamin poprawkowy"
    } ]

    var members = [
      {
        id: 1,
        name: "John Smith",
        role: "Owner"
      },
      {
        id: 2,
        name: "Aaron Gordon",
        role: "Assistant"
      },
      {
        id: 3,
        name: "Nate Williams",
        role: "Assistant"
      },
    ]

    return (
        <div className="class-div">
            <TaskPoolList pools={task_pools}></TaskPoolList>
            <MembersList members={members}></MembersList>
        </div>
    )
}
