import { useState } from 'react';
import './App.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z]/g, '');
        setInputText(value.toUpperCase());
    };

    const handleKeywordChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z]/g, '');
        setKeyword(value.toUpperCase());
    };

    const handleEncrypt = async () => {
        if (!keyword.trim()) {
            alert('Ошибка: введите ключевое слово');
            return;
        }
        if (!inputText.trim()) {
            alert('Ошибка: введите текст для шифрования');
            return;
        }
        try {
            const result = await window.go.main.App.Encrypt(inputText, keyword);
            setOutputText(result);
        } catch (err) {
            alert('Ошибка при шифровании: ' + err);
        }
    };

    const handleDecrypt = async () => {
        if (!keyword.trim()) {
            alert('Ошибка: введите ключевое слово');
            return;
        }
        if (!inputText.trim()) {
            alert('Ошибка: введите текст для дешифрования');
            return;
        }
        try {
            const result = await window.go.main.App.Decrypt(inputText, keyword);
            setOutputText(result);
        } catch (err) {
            alert('Ошибка при дешифровании: ' + err);
        }
    };

    const handleReadFile = async () => {
        try {
            const content = await window.go.main.App.OpenFile();
            if (content === "") {
                alert('Файл пуст или не выбран');
                return;
            }
            if (content.startsWith('Error:')) {
                alert(content);
                return;
            }
            const cleanText = content.replace(/[^a-zA-Z]/g, '').toUpperCase();
            setInputText(cleanText);
        } catch (err) {
            alert('Ошибка при открытии файла: ' + err);
        }
    };

    const handleSaveFile = async () => {
        if (!outputText.trim()) {
            alert('Нет данных для сохранения');
            return;
        }
        try {
            await window.go.main.App.SaveFile(outputText);
        } catch (err) {
            alert('Ошибка при сохранении файла: ' + err);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setKeyword('');
    };

    return (
        <div className="app">
            <h1>🔐 ПРОГРЕССИВНЫЙ ШИФР ВИЖЕНЕРА</h1>
            <p className="subtitle">Каждая буква ключа увеличивается на 1 после использования</p>

            <div className="row">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="КЛЮЧЕВОЕ СЛОВО"
                    className="keyword"
                    maxLength={20}
                />
            </div>

            <div className="row">
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="ИСХОДНЫЙ ТЕКСТ (ТОЛЬКО A-Z)"
                    className="textarea"
                    rows={5}
                />
            </div>

            <div className="buttons">
                <button onClick={handleEncrypt} className="btn encrypt">ЗАШИФРОВАТЬ</button>
                <button onClick={handleDecrypt} className="btn decrypt">РАСШИФРОВАТЬ</button>
                <button onClick={handleReadFile} className="btn file">📂 ОТКРЫТЬ</button>
                <button onClick={handleSaveFile} className="btn save">💾 СОХРАНИТЬ</button>
                <button onClick={handleClear} className="btn clear">🗑️ ОЧИСТИТЬ</button>
            </div>

            <div className="row">
                <textarea
                    value={outputText}
                    readOnly
                    placeholder="РЕЗУЛЬТАТ"
                    className="textarea output"
                    rows={5}
                />
            </div>
        </div>
    );
}

export default App;