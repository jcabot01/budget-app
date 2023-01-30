import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";

const EditExpenseModal = ({ show, handleClose, budgetId, theme, expenses, expense }) => {
  const { editExpense, budgets } = useBudgets();

  const [newDescription, setNewDescription] = useState(expense.description)
  const [newAmount, setNewAmount] = useState(expense.amount)
  // // const {budget, setBudget} = useState(budgets.name)
  
  // const id = budgetId;

  // const updatedExpense = {id, description, amount}

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(e);
  //   editExpense({id, updatedExpense})
  //   handleClose();
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    editExpense({
      // id: id,
      description: newDescription,
      amount: parseFloat(newAmount),
      // budgetId: e.current.value,
    });
    handleClose();
  }

  // expenses.map((expense) => {
  //   console.log(expense);
  // })
  console.log(expense.description)
 

  return (
    <Modal data-theme={theme} show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {expense.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text"
              name="description"
              placeholder={expense.description}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder={expense.amount}
              value={newAmount}
              // onChange={(e) => console.log(e.target.value)}
              onChange={(e) => setNewAmount(e.target.value)}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Category</Form.Label>
            <Form.Select onSelect={(e) => setBudget(e.target.value)} defaultValue={budgetId}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}
          <div className="d-flex justify-content-end">
            <Button variant="sm" type="submit">
              Update Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};


export default EditExpenseModal;
