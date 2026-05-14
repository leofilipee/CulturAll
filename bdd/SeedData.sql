USE culturall;

INSERT INTO tipoutilizador (idtipoutilizador, tutipo) VALUES
(1, 'anonimo'),
(2, 'registado'),
(3, 'organizador'),
(4, 'administrador');

INSERT INTO utilizador (utnome, utemail, utpasswordhash, utinicio, uttipo, utestado) VALUES
('Maria Silva', 'maria@example.com', 'user123', '2025-01-15', 2, 'ativo'),
('João Almeida', 'joao@example.com', 'org123', '2024-11-05', 3, 'ativo'),
('Admin Cultur''All', 'admin@culturall.pt', 'admin123', '2024-10-01', 4, 'ativo'),
('Ana Costa', 'ana@example.com', 'user123', '2025-02-20', 2, 'ativo'),
('Pedro Oliveira', 'pedro@example.com', 'user123', '2025-01-10', 2, 'inativo'),
('Sofia Ferreira', 'sofia@example.com', 'org123', '2026-03-01', 3, 'ativo'),
('Carlos Mendes', 'carlos@example.com', 'org123', '2025-01-20', 3, 'ativo'),
('Rita Alves', 'rita@example.com', 'org123', '2024-12-10', 3, 'inativo');

-- Adicionar administrador adicional conforme pedido
INSERT INTO utilizador (utnome, utemail, utpasswordhash, utinicio, uttipo, utestado) VALUES
('Admin Cultural', 'admin@cultural.pt', 'admin123', '2026-05-14', 4, 'ativo');

INSERT INTO administrador (adidutilizador)
SELECT idutilizador FROM utilizador WHERE utemail = 'admin@culturall.pt';

-- Atribuir também o papel de administrador ao novo admin
INSERT INTO administrador (adidutilizador)
SELECT idutilizador FROM utilizador WHERE utemail = 'admin@cultural.pt';

INSERT INTO organizador (orgnome, orgemail, orgdescricao, orgwebsite, orginicio, orgestado, orgidutilizador) VALUES
('João Almeida', 'joao@example.com', 'Organizador de concertos e eventos culturais.', 'https://joaoalmeida.pt', '2024-11-05', 'aprovado', (SELECT idutilizador FROM utilizador WHERE utemail = 'joao@example.com')),
('Carlos Mendes', 'carlos@example.com', 'Promotor de experiências gastronómicas e festivais.', 'https://carlosmendes.pt', '2025-01-20', 'aprovado', (SELECT idutilizador FROM utilizador WHERE utemail = 'carlos@example.com')),
('Rita Alves', 'rita@example.com', 'Curadora de exposições e arte contemporânea.', 'https://ritaalves.pt', '2024-12-10', 'suspenso', (SELECT idutilizador FROM utilizador WHERE utemail = 'rita@example.com')),
('Sofia Ferreira', 'sofia@example.com', 'Organização de eventos familiares e educativos.', 'https://sofiaferreira.pt', '2026-03-01', 'aprovado', (SELECT idutilizador FROM utilizador WHERE utemail = 'sofia@example.com'));

INSERT INTO categoria (catnome) VALUES
('Arte e Exposições'),
('Bem Estar'),
('Cinema'),
('Comédia'),
('Concertos'),
('Dança'),
('Festivais'),
('Gastronomia'),
('Literatura'),
('Mercados e Feiras'),
('Moda'),
('Outros'),
('Família'),
('Teatro');

INSERT INTO localizacao (locmorada, loccidade, locdistrito) VALUES
('Centro Cultural de Belém', 'Lisboa', 'Lisboa'),
('Teatro Nacional D. Maria II', 'Lisboa', 'Lisboa'),
('Museu Berardo', 'Lisboa', 'Lisboa'),
('Casa da Música', 'Porto', 'Porto'),
('Parque da Cidade', 'Porto', 'Porto'),
('Évora Centro Histórico', 'Évora', 'Évora'),
('Jardim da Estrela', 'Lisboa', 'Lisboa'),
('Hot Clube de Portugal', 'Porto', 'Porto'),
('MEO Arena', 'Lisboa', 'Lisboa'),
('Alfama', 'Lisboa', 'Lisboa'),
('FIL', 'Lisboa', 'Lisboa'),
('Costa da Caparica', 'Costa da Caparica', 'Setúbal');

INSERT INTO evento (
    evtitulo, evdescricao, evdatainicio, evdatafim, evvalor, evlinkbilhete, evestado,
    evdatasubmissao, evdataaprovacao, evmotivorecusa, evrecorrente, evperiodicidade, evdiasrecorrencia,
    evidcategoria, evidlocalizacao, evidorganizador, evidadministradoraprovador
) VALUES
('Festival de Fado de Lisboa', 'Uma noite dedicada ao fado tradicional português.', '2026-03-20 21:00:00', NULL, 25.00, 'https://bilhetes.culturall.pt/fado', 'publicado', '2026-03-01 10:00:00', '2026-03-02 09:00:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Concertos'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Centro Cultural de Belém' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Peça: O Auto da Barca do Inferno', 'Clássico do teatro português em cena.', '2026-03-18 19:30:00', NULL, 18.00, 'https://bilhetes.culturall.pt/barca', 'publicado', '2026-03-01 11:00:00', '2026-03-02 09:10:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Teatro'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Teatro Nacional D. Maria II' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Exposição: Arte Contemporânea Portuguesa', 'Exposição com artistas contemporâneos nacionais.', '2026-03-15 10:00:00', NULL, 0.00, NULL, 'publicado', '2026-03-01 12:00:00', '2026-03-02 09:20:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Arte e Exposições'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Museu Berardo' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'rita@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Espetáculo de Dança Contemporânea', 'Performance contemporânea com nova companhia.', '2026-03-22 20:00:00', NULL, 15.00, 'https://bilhetes.culturall.pt/danca', 'publicado', '2026-03-03 14:00:00', '2026-03-04 09:00:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Dança'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Casa da Música' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Festival Primavera Sound', 'Festival de música com vários palcos.', '2026-03-28 16:00:00', NULL, 85.00, 'https://bilhetes.culturall.pt/primavera', 'publicado', '2026-03-03 15:00:00', '2026-03-04 09:30:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Festivais'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Parque da Cidade' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'carlos@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Rota Gastronómica do Alentejo', 'Experiência gastronómica regional.', '2026-03-16 12:00:00', NULL, 45.00, 'https://bilhetes.culturall.pt/alentejo', 'publicado', '2026-03-03 16:00:00', '2026-03-04 09:45:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Gastronomia'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Évora Centro Histórico' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'carlos@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Cinema ao Ar Livre: Clássicos Portugueses', 'Sessão de cinema ao ar livre.', '2026-03-19 21:30:00', NULL, 0.00, NULL, 'publicado', '2026-03-03 17:00:00', '2026-03-04 10:00:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Cinema'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Jardim da Estrela' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Noite de Jazz no Porto', 'Concerto intimista de jazz.', '2026-03-25 22:00:00', NULL, 20.00, 'https://bilhetes.culturall.pt/jazz', 'oculto', '2026-03-03 18:00:00', '2026-03-04 10:15:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Concertos'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Hot Clube de Portugal' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Concerto K-Pop', 'Evento familiar de música pop.', '2026-04-25 15:00:00', NULL, 30.00, 'https://bilhetes.culturall.pt/kpop', 'publicado', '2026-03-05 10:00:00', '2026-03-06 11:00:00', NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Família'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'MEO Arena' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'sofia@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Noite do Fado', 'Evento periódico de fado todas as semanas.', '2026-04-24 21:30:00', NULL, 18.00, 'https://bilhetes.culturall.pt/fadoperiodico', 'publicado', '2026-03-05 10:30:00', '2026-03-06 11:15:00', NULL, 1, 'semanal', 'Sex', (SELECT idcategoria FROM categoria WHERE catnome = 'Concertos'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Alfama' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'joao@example.com' LIMIT 1), (SELECT idadministrador FROM administrador LIMIT 1)),
('Web Summit Lisboa 2026', 'Evento de tecnologia e inovação.', '2026-11-09 09:00:00', NULL, 390.00, 'https://bilhetes.culturall.pt/websummit', 'pendente', '2026-05-08 09:00:00', NULL, NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Outros'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'FIL' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'carlos@example.com' LIMIT 1), NULL),
('Sol da Caparica 2026', 'Festival de verão com vários artistas.', '2026-08-13 16:00:00', NULL, 45.00, 'https://bilhetes.culturall.pt/solcaparica', 'pendente', '2026-05-09 10:00:00', NULL, NULL, 0, NULL, NULL, (SELECT idcategoria FROM categoria WHERE catnome = 'Festivais'), (SELECT idlocalizacao FROM localizacao WHERE locmorada = 'Costa da Caparica' LIMIT 1), (SELECT idorganizador FROM organizador WHERE orgemail = 'carlos@example.com' LIMIT 1), NULL);

INSERT INTO imagem (imglegenda, imgurl, imgtipo, imgidevento) VALUES
('Festival de Fado de Lisboa', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Festival de Fado de Lisboa' LIMIT 1)),
('Peça: O Auto da Barca do Inferno', 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Peça: O Auto da Barca do Inferno' LIMIT 1)),
('Exposição: Arte Contemporânea Portuguesa', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Exposição: Arte Contemporânea Portuguesa' LIMIT 1)),
('Espetáculo de Dança Contemporânea', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=75', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Espetáculo de Dança Contemporânea' LIMIT 1)),
('Festival Primavera Sound', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=70', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Festival Primavera Sound' LIMIT 1)),
('Rota Gastronómica do Alentejo', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Rota Gastronómica do Alentejo' LIMIT 1)),
('Cinema ao Ar Livre: Clássicos Portugueses', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Cinema ao Ar Livre: Clássicos Portugueses' LIMIT 1)),
('Noite de Jazz no Porto', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=74', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Noite de Jazz no Porto' LIMIT 1)),
('Concerto K-Pop', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=72', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Concerto K-Pop' LIMIT 1)),
('Noite do Fado', 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Noite do Fado' LIMIT 1)),
('Web Summit Lisboa 2026', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Web Summit Lisboa 2026' LIMIT 1)),
('Sol da Caparica 2026', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=68', 'capa', (SELECT idevento FROM evento WHERE evtitulo = 'Sol da Caparica 2026' LIMIT 1));

INSERT INTO favorito (favidutilizador, favidevento) VALUES
((SELECT idutilizador FROM utilizador WHERE utemail = 'maria@example.com'), (SELECT idevento FROM evento WHERE evtitulo = 'Festival de Fado de Lisboa')),
((SELECT idutilizador FROM utilizador WHERE utemail = 'maria@example.com'), (SELECT idevento FROM evento WHERE evtitulo = 'Festival Primavera Sound')),
((SELECT idutilizador FROM utilizador WHERE utemail = 'ana@example.com'), (SELECT idevento FROM evento WHERE evtitulo = 'Cinema ao Ar Livre: Clássicos Portugueses'));

INSERT INTO preferencia (prefidutilizador, prefidcategoria) VALUES
((SELECT idutilizador FROM utilizador WHERE utemail = 'maria@example.com'), (SELECT idcategoria FROM categoria WHERE catnome = 'Concertos')),
((SELECT idutilizador FROM utilizador WHERE utemail = 'maria@example.com'), (SELECT idcategoria FROM categoria WHERE catnome = 'Cinema')),
((SELECT idutilizador FROM utilizador WHERE utemail = 'ana@example.com'), (SELECT idcategoria FROM categoria WHERE catnome = 'Família'));

INSERT INTO notificacao (notidutilizador, notidevento, notmensagem, notdata) VALUES
((SELECT idutilizador FROM utilizador WHERE utemail = 'maria@example.com'), (SELECT idevento FROM evento WHERE evtitulo = 'Festival de Fado de Lisboa'), 'Evento confirmado com sucesso.', '2026-03-02 09:15:00'),
((SELECT idutilizador FROM utilizador WHERE utemail = 'joao@example.com'), (SELECT idevento FROM evento WHERE evtitulo = 'Noite do Fado'), 'Evento recorrente publicado.', '2026-03-06 11:20:00');