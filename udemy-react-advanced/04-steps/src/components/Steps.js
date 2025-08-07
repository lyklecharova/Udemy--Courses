import { useState } from 'react';
import { messages } from './App';
import { Button } from './Button';
import { StepMessage } from './StepMessage';

export function Steps() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious() {
        if (step > 1) setStep((s) => s - 1);
    }

    function handleNext() {
        if (step < 3) {
            setStep((s) => s + 1);
        }
    }

    return (
        <>
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? 'active' : ''}>1</div>
                        <div className={step >= 2 ? 'active' : ''}>2</div>
                        <div className={step >= 3 ? 'active' : ''}>3</div>
                    </div>
                    <StepMessage step={step}>
                        {messages[step - 1]}
                        <div className="buttons">
                            <Button
                                bgColor="#e7e7e7"
                                textColor="#333"
                                onClick={() =>
                                    alert(`Learn how to ${messages[step - 1]}`)
                                }
                            >
                                Learn how
                            </Button>
                        </div>
                    </StepMessage>

                    <div className="buttons">
                        <Button
                            bgColor="#7950f2"
                            textColor="#fff"
                            onClick={handlePrevious}
                        >
                            <span>👈</span>Previous
                        </Button>

                        <Button
                            bgColor="#7950f2"
                            textColor="#fff"
                            onClick={handleNext}
                        >
                            Next <span>👉</span>
                            <span>😎</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
