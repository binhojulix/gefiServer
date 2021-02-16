CREATE TABLE `controles` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario_fk` int DEFAULT NULL,
  `equipamento_fk` int DEFAULT NULL,
  `data_devolucao` datetime DEFAULT NULL,
  `data_retirada` datetime DEFAULT NULL,
  `controle_status` int DEFAULT NULL,
  `area_fk` int DEFAULT NULL,
  `descricao_falha` varchar(45) DEFAULT NULL,
  `resolucao_da_falha` varchar(45) DEFAULT NULL,
  FOREIGN KEY (`usuario_fk`) REFERENCES `usuarios` (`id`),
   FOREIGN KEY (`equipamento_fk`) REFERENCES `equipamentos` (`id`),
    FOREIGN KEY (`area_fk`) REFERENCES `areas` (`id`),

) ENGINE=InnoDB AUTO_INCREMENT=449 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;