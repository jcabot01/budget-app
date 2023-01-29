import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";

const EditExpenseModal = ({ show, handleClose, budgetId, theme, expenses, theExpense }) => {
  // const descriptionRef = useRef();
  // const amountRef = useRef();
  // const budgetIdRef = useRef();
  const { editExpense, budgets } = useBudgets();

  const id = budgetId;

  const {description, setDescription} = useState(theExpense.description)
  const {amount, setAmount} = useState(theExpense.amount)
  const {budget, setBudget} = useState(budgets.name)
  
  const updatedExpense = {id, description, amount, budget}

  // console.log(theExpense[0].description);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    editExpense({id, updatedExpense})
  }


  return (
    <Modal data-theme={theme} show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Category</Form.Label>
            <Form.Select onSelect={(e) => setBudget(e.target.value)} defaultValue={budgetId}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="sm" type="submit">
              Update
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};


export default EditExpenseModal;
