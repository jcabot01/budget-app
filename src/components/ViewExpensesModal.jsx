import {useState} from 'react'
import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import EditExpenseModal from './EditExpenseModal';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [expenseToBeEdited, setExpenseToBeEdited] = useState();
  // const [expenseToBeEdited, setExpenseToBeEdited] = useState({});
  const expenses = getBudgetExpenses(budgetId)
  
  const budget =
  UNCATEGORIZED_BUDGET_ID === budgetId
  ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
  : budgets.find((b) => b.id === budgetId); 
   
  function openEditExpenseModal() {  
    setShowEditExpenseModal(true);
    handleClose();
  }

  function setExpense(e) {
    let foundExpense = expenses.find(expense => expense.id === e.target.parentElement.id)
    setExpenseToBeEdited(foundExpense);  
    openEditExpenseModal()
  }
  

  return (
    <>
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton aria-label="Close Expense Viewer" title="Close Expense Viewer">
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div><span>{budget?.name}</span></div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                deleteBudget(budget);
                handleClose();
                }}
                variant="outline"
              >
                <MdDelete 
                  aria-label="Delete Category" 
                  title="Delete Category"/>
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
            {expenses.map(expense => (
                <Stack direction="horizontal" gap="2" key={expense.id}>
                    <div type="text" className="me-auto fs-4">{expense.description}</div>
                    <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                    <Button 
                      onClick={(e)=>setExpense(e)}
                      id={expense.id}
                      description={expense.description}
                      amount={expense.amount}
                      variant="sm"
                      aria-label={`Edit ${expense.description}`} 
                      title={`Edit ${expense.description}`}>
                      <MdModeEditOutline/>
                    </Button>
                    <Button 
                      onClick={() => deleteExpense(expense)}
                      variant="sm"
                      aria-label={`Delete ${expense.description}`} 
                      title={`Delete ${expense.description}`}>
                      <MdDelete/>
                    </Button>
                </Stack>
            ))}
        </Stack>
      </Modal.Body>
    </Modal>

{showEditExpenseModal ?
  <EditExpenseModal

  expense = {expenseToBeEdited}
  // expense = {expenses}
  // budgetId={budgetId}
  // expenses={expenses.map((expense) => (
  //   {
  //   id: expense.id,
  //   description: expense.description, 
  //   amount: expense.amount}
  // ))}
  show={showEditExpenseModal}
  // handleClose={() => setShowEditExpenseModal(false)}
  // handleClose={() => setShowEditExpenseModal(false)}
/>

:
""
}
    
 
    
      </>
  );
};

export default ViewExpensesModal;