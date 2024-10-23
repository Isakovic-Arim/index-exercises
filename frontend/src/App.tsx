import Assessment from './components/assessment'
import Question from './components/question'

function App() {
    return (
        <>
            <Assessment>
                <Question
                    contextQuery="SELECT * FROM sales WHERE TRUNC(sale_date) = TRUNC(sysdate - INTERVAL '7' DAY);"
                    defaultQuery='CREATE INDEX <index_name> ON <table_name> (<index_def>)'
                    task='Create an index that will optimize the following query:'
                />
                <Question
                    defaultQuery='CREATE INDEX <index_name> ON <table_name> (<index_def>)'
                    task='Create an index that will optimize the following query'
                />
                <Question
                    contextQuery="CREATE FUNCTION quarter_begin(dt IN DATE) RETURN DATE AS BEGIN RETURN TRUNC(dt, 'Q'); END;
                    CREATE FUNCTION quarter_end(dt IN DATE) RETURN DATE AS BEGIN RETURN TRUNC(ADD_MONTHS(dt, +3), 'Q') - (1/(24*60*60)); END;"
                    defaultQuery="SELECT * FROM sales WHERE sale_date >= ? AND sale_date < ? INTERVAL '1' DAY"
                    task='Rewrite the query so that it uses the predefined quarter_begin and quarter_end functions'
                />
                <Question
                    defaultQuery="SELECT * FROM sales WHERE TO_CHAR(sale_date, 'YYYY-MM-DD') = '2024-10-15'"
                    task='Fix the anti-pattern in the query'
                />
                <Question
                    defaultQuery="SELECT * FROM sales WHERE TO_NUMBER(AMOUNT) = 250.50"
                    task='Fix the anti-pattern in the query'
                />
                <Question
                    defaultQuery="SELECT first_name, last_name, employee_id FROM employees
                    WHERE (employee_id = :emp_id OR :emp_id IS NULL) AND (UPPER(last_name) = :name OR :name IS NULL)"
                    task='Adjust the query so that the index is used instead of a full-table-scan'
                />
                <Question
                    defaultQuery="CREATE INDEX <index_name> ON <table_name> (<index_def>)"
                    task='Create an index to serve for the equation in the query: 3*a - b'
                />
            </Assessment>
        </>
    )
}

export default App
