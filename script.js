window.onload = function() {
    const form = document.getElementById("imc-form");
    const btn = document.getElementById("submit");
    const alerta = document.getElementById("alerta");
    const classificacaoElemento = document.getElementById("classificacao");

    btn.addEventListener("click", () => {
        let altura = parseFloat(form.altura.value);
        const unidadeAltura = document.getElementById("unidade-altura").value;
        const peso = parseFloat(form.peso.value);
        const resultado = document.getElementById("resultado");

        if (altura && peso) {// Verifica se todos os campos foram preenchidos
            let imc = calculoImc(altura, unidadeAltura, peso);
            let classificacaoTexto = classificacao(imc)
            resultado.value = imc;
            classificacaoElemento.textContent = `Classificação: ${classificacaoTexto}`;
            classificacaoElemento.style.display = "block"; // Mostra a classificação
        } else {
            alerta.style.display = "block";
            console.log("Por favor, preencha todos os campos.");
        }
    });
    exemplosValores();
}

function calculoImc(altura, unidadeAltura, peso){

    if (unidadeAltura === "cm") { 
        altura = altura / 100; //converte m para cm
    }

    const IMC = (peso / (altura * altura)).toFixed(2); //calcula o imc
    console.log(`Seu IMC é: ${IMC}`);
    alerta.style.display = "none";
    return IMC;
}

function classificacao(imc){

    // Determinar a classificação do imc
    let classificacaoTexto;
    if (imc < 18.5) {
        classificacaoTexto = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacaoTexto = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        classificacaoTexto = "Sobrepeso";
    } else {
        classificacaoTexto = "Obesidade";
    }

    console.log(`Classificação: ${classificacaoTexto}`);
    return classificacaoTexto;
}

function gerarValoresAleatorios() {
    const altura = (Math.random() * (2.0 - 1.4) + 1.4).toFixed(2); // Altura entre 1.4m e 2.0m
    const peso = (Math.random() * (150 - 40) + 40).toFixed(1); // Peso entre 40kg e 150kg

    return { altura: parseFloat(altura), peso: parseFloat(peso) };
}

function exemplosValores() {
    for (let i = 0; i < 5; i++) { // 5 exemplos de teste
        const { altura, peso } = gerarValoresAleatorios();
        console.log(`Exemplo ${i + 1}: Altura = ${altura}${"m"}, Peso = ${peso}kg`);
        let imc = calculoImc(altura, "m", peso);
        classificacao(imc);
    }
}