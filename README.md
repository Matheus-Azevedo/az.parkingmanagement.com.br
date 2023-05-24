# PARKING MANAGEMENT

O projeto consiste no desenvolvimento de uma aplicação para gerenciamento de um estacionamento com pagamento em dinheiro automático. A ideia é criar um sistema que controle a entrada e saída de veículos, registrando as informações necessárias, como placa e tipo de veículo, para calcular o preço a ser cobrado.

Ao entrar no estacionamento, o veículo é registrado no sistema, e ao sair, é registrada a saída. Com base no tempo de permanência e no tipo de veículo, o sistema calcula o valor a ser cobrado.

O pagamento é feito em dinheiro, utilizando um caixa eletrônico. O motorista insere as notas e moedas na máquina, e o sistema retorna o troco adequado com base nas informações do estoque de notas e moedas disponíveis. Por exemplo, se o preço a ser pago for R$ 17,45 e o cliente der uma nota de R$ 10, duas notas de R$ 5,00 e uma moeda de R$ 0,50, o sistema deve retornar o troco de acordo com as notas e moedas disponíveis em estoque.

O sistema também deve possibilitar a visualização do estoque de moedas e notas, bem como a movimentação diária dos clientes. Todos os cadastros e registros serão feitos manualmente, simulando a leitura e inserção de informações.

Para a implementação, você pode escolher a tecnologia de sua preferência. No entanto, é necessário que haja uma separação entre o front-end e o back-end, que se comuniquem por meio de uma API Rest com autenticação JWT. O banco de dados utilizado deverá ser o PostgreSQL.