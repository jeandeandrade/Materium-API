-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `papel` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `tipoEmpresa` VARCHAR(191) NULL,

    UNIQUE INDEX `Empresa_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioEmpresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `tipoVinculo` VARCHAR(191) NULL,
    `percentualSocietario` DOUBLE NULL,
    `dataEntrada` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,
    `fornecedorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cotacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaCompradoraId` INTEGER NOT NULL,
    `empresaFornecedoraId` INTEGER NOT NULL,
    `dataSolicitacao` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CotacaoItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotacaoId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvaliacaoFornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fornecedorId` INTEGER NOT NULL,
    `avaliadorId` INTEGER NOT NULL,
    `nota` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioEmpresa` ADD CONSTRAINT `UsuarioEmpresa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioEmpresa` ADD CONSTRAINT `UsuarioEmpresa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotacao` ADD CONSTRAINT `Cotacao_empresaCompradoraId_fkey` FOREIGN KEY (`empresaCompradoraId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotacao` ADD CONSTRAINT `Cotacao_empresaFornecedoraId_fkey` FOREIGN KEY (`empresaFornecedoraId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotacaoItem` ADD CONSTRAINT `CotacaoItem_cotacaoId_fkey` FOREIGN KEY (`cotacaoId`) REFERENCES `Cotacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotacaoItem` ADD CONSTRAINT `CotacaoItem_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvaliacaoFornecedor` ADD CONSTRAINT `AvaliacaoFornecedor_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvaliacaoFornecedor` ADD CONSTRAINT `AvaliacaoFornecedor_avaliadorId_fkey` FOREIGN KEY (`avaliadorId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
