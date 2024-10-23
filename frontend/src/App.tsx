import Assessment from './components/assessment'
import Question from './components/question'
import {useEffect, useState} from "react";

function App() {
    const [questions, setQuestions] = useState<{ ID: number, IS_RESOLVED: 0 | 1 }[]>([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/questions`)
            .then(res => res.json()).then(data => {
            setQuestions(data.data)
        })
    }, []);

    const checkAllResolved = (questions: any) => {
        const allResolved = questions.every((q: {ID: number, IS_RESOLVED: 0 | 1}) => q.IS_RESOLVED === 1);
        setFinished(allResolved);
    };

    return (
        <>
            <p className='fixed'>{`${questions.filter(q => q.IS_RESOLVED === 1).length} / ${questions.length} questions resolved`}</p>
            {questions.length > 0 ?
                <Assessment>
                    <Question
                        id={1}
                        contextQuery="SELECT * FROM sales WHERE TRUNC(sale_date) = TRUNC(sysdate - INTERVAL '7' DAY);"
                        defaultQuery='CREATE INDEX <index_name> ON <table_name> (<index_def>)'
                        solutionQuery='CREATE INDEX sales_date_pure ON sales (TRUNC(sale_date))'
                        task='Create an index that will optimize the following query:'
                        initialResolved={questions[0].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 1 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 1 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                    <Question
                        id={2}
                        contextQuery="CREATE FUNCTION quarter_begin(dt IN DATE) RETURN DATE AS BEGIN RETURN TRUNC(dt, 'Q'); END;
                    CREATE FUNCTION quarter_end(dt IN DATE) RETURN DATE AS BEGIN RETURN TRUNC(ADD_MONTHS(dt, +3), 'Q') - (1/(24*60*60)); END;"
                        defaultQuery="SELECT * FROM sales WHERE sale_date >= ? AND sale_date < ? INTERVAL '1' DAY"
                        solutionQuery='SELECT * FROM sales WHERE sale_date BETWEEN quarter_begin(?) AND quarter_end(?)'
                        task='Rewrite the query so that it uses the predefined quarter_begin and quarter_end functions'
                        initialResolved={questions[1].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 2 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 2 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                    <Question
                        id={3}
                        defaultQuery="SELECT * FROM sales WHERE TO_CHAR(sale_date, 'YYYY-MM-DD') = '2024-10-15'"
                        solutionQuery="SELECT * FROM sales WHERE sale_date = TO_DATE('2024-10-15', 'YYYY-MM-DD')"
                        task='Fix the anti-pattern in the query'
                        initialResolved={questions[2].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 3 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 3 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                    <Question
                        id={4}
                        defaultQuery="SELECT * FROM sales WHERE TO_NUMBER(AMOUNT) = 250.50"
                        solutionQuery='SELECT * FROM sales WHERE AMOUNT = 250.50'
                        task='Fix the anti-pattern in the query'
                        initialResolved={questions[3].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 4 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 4 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                    <Question
                        id={5}
                        defaultQuery="SELECT first_name, last_name, employee_id FROM employees
                    WHERE (employee_id = :emp_id OR :emp_id IS NULL) AND (UPPER(last_name) = :name OR :name IS NULL)"
                        solutionQuery="SELECT first_name, last_name, employee_id FROM employees WHERE (employee_id = NULL OR NULL IS NULL) AND (UPPER(last_name) = 'DOE' OR 'DOE' IS NULL)"
                        task='Adjust the query so that the index is used instead of a full-table-scan'
                        initialResolved={questions[4].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 5 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 5 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                    <Question
                        id={6}
                        defaultQuery="CREATE INDEX <index_name> ON <table_name> (<index_def>)"
                        solutionQuery='CREATE INDEX math ON MATH (3*a - b)'
                        task='Create an index to serve for the equation in the query: 3*a - b'
                        initialResolved={questions[5].IS_RESOLVED === 1}
                        onResolve={() => {
                            setQuestions(questions.map(q => q.ID === 6 ? {...q, IS_RESOLVED: 1} : q))
                            checkAllResolved(questions.map(q => q.ID === 6 ? {...q, IS_RESOLVED: 1} : q))
                        }}
                    />
                </Assessment>
                : <h1 className='text-3xl'>Loading...</h1>
            }
            {finished && <div className='h-screen grid place-items-center'>
                <h1 className='text-3xl'>You have resolved all questions like a boss!</h1>
                <img src='/big-boss-smoking.gif' alt='big-boss-smoking' className='w-1/2'/>
            </div>}
        </>
    )
}

export default App
