//COMPONENTS
import {
  AvatarList,
  StyledH2,
  CardComponent,
  CustomChart,
  Header,
  CustomTable,
  StyledH3,
  StyledSpan,
} from "@/components";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

// UTILS
import { currencyConverter, highlightTextConverter } from "@/utils";

// HOOKS
import { useGet } from "@/hooks";

// TYPES
import { HighlightsData, StarsData, NewsData, CustomChartProps } from "@/types";

function Home() {
  // HIGHLIGHTS
  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
  } = useGet<HighlightsData[]>("sales/highlights");

  // SALES PER MONTH
  const {
    data: salesPerMonthData,
    loading: salesPerMonthLoading,
    error: salesPerMonthError,
  } = useGet<CustomChartProps>("sales/month");

  // SALES STARS
  const {
    data: salesStarsData,
    loading: salesStarsLoading,
    error: salesStarsError,
  } = useGet<StarsData[]>("sales/stars");

  // NEWS
  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useGet<NewsData[]>("news");


  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {/* HIGHLIGHTS */}
          {!highlightsError && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                  }
                  id="total-sales"
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 color="inherit" className="mb-1">
                        Total de vendas no mês
                      </StyledH2>

                      <StyledH3
                        color="inherit"
                        className="mb-1"
                        size={40}
                        lineheight={40}
                      >
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>

                      <StyledSpan color="inherit">
                        {highlightsData[0].subtitle}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>

              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsData
                      ? highlightsData[1].subtitle
                      : "skeleton-loading skeleton-loading-mh-1"
                  }
                  id="month-goal"
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1" color="white">
                        Meta do mês
                      </StyledH2>
                      <StyledH3
                        className="mb-1"
                        size={40}
                        lineheight={40}
                        color="white"
                      >
                        {currencyConverter(highlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan color="white">
                        {highlightTextConverter(highlightsData[1].subtitle)}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>

              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                  }
                  id="total-leads"
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <Link to="/leads">
                        <StyledH2 color="inherit" className="mb-1">
                          Leads contactados
                        </StyledH2>
                        <StyledH3
                          color="inherit"
                          className="mb-1"
                          size={40}
                          lineheight={40}
                        >
                          {highlightsData[2].value}
                        </StyledH3>
                        <StyledSpan color="inherit">
                          {highlightsData[2].subtitle}
                        </StyledSpan>
                      </Link>
                    </>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}

          {/* SALES PER MONTH */}
          <Grid item xs={12} md={7}>
            {!salesPerMonthError && (
              <CardComponent
                className={
                  salesPerMonthLoading
                    ? "skeleton-loading skeleton-loading-mh-2"
                    : ""
                }
                id="month-sales-chart"
              >
                {!salesPerMonthLoading && salesPerMonthData && (
                  <>
                    <StyledH2 color="inherit" className="mb-1">
                      Valor de vendas no mês
                    </StyledH2>
                    <CustomChart
                      labels={salesPerMonthData.labels}
                      data={salesPerMonthData.data}
                      type={salesPerMonthData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          {/* SALES STARS */}
          <Grid item xs={12} md={5}>
            {!salesStarsError && (
              <CardComponent
                className={
                  salesStarsLoading
                    ? "skeleton-loading skeleton-loading-mh-2"
                    : ""
                }
                id="sales-stars"
              >
                {!salesStarsLoading && salesStarsData && (
                  <>
                    <StyledH2 color="inherit" className="mb-1">
                      Maiores vendedores no mês
                    </StyledH2>
                    <AvatarList
                      listData={salesStarsData.map((star) => ({
                        avatar: "/dnc-avatar.svg", 
                        name: star.name,
                        subtitle: currencyConverter(star.value),
                      }))}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          {/* NEWS */}
          <Grid item xs={12} md={5}>
            {!newsError && (
              <CardComponent
                className={
                  newsLoading ? "skeleton-loading skeleton-loading-mh-2" : ""
                }
                id="news"
              >
                {!newsLoading && newsData && (
                  <>
                    <StyledH2 color="inherit" className="mb-1">
                      Notícias relevantes
                    </StyledH2>
                    <CustomTable
                      headers={["Título", "Horário"]}
                      rows={newsData.map((news) => [
                        <a
                          key={news.title}
                          className="ellipsis ellipsis-sm"
                          href={news.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {news.title}
                        </a>,
                        <a
                          key={news.date}
                          href={news.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {news.date}
                        </a>,
                      ])}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
